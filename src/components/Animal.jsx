import { useEffect, useState } from 'react';

import styles from './Animal.module.css';

const Animal = (props) => {
  const [animal, setAnimal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isExterminated, setIsExterminated] = useState(false);

  const sendRequest = () => {
    setIsLoading(true);
    setIsExterminated(false);
    fetch(props.apiUrl)
      .then((data) => data.json())
      .then((data) => {
        if (data.error) throw new Error();
        setAnimal(data);
        setIsLoading(false);
      })
      .catch(() => {
        setErrorMsg('Sorry there was a problem fetching the data');
        setIsLoading(false);
      });
  };

  useEffect(() => {
    sendRequest();
  }, []);

  const deleteAnimal = () => {
    setAnimal(false);
    setIsExterminated(true);
  };

  const animalDetails = (
    <div>
      <img src={animal.image_link} alt={`a cute looking ${animal.name}`} />
      <h3>{animal.name}</h3>
      <h4>{animal.animal_type}</h4>
      <ul>
        <li>Latin name: {animal.latin_name}</li>
        <li>Habitat: {animal.habitat}</li>
        <li>
          Weight: {animal.weight_min}lbs - {animal.weight_max}lbs
        </li>
        <li>Lifespan: {animal.lifespan} years</li>
      </ul>
      <button onClick={deleteAnimal}>Exterminate</button>
    </div>
  );

  const newAnimal = (
    <div>
      <p>😭 You monster! Fetch a new animal?</p>
      <button onClick={() => sendRequest()}>New Animal</button>
    </div>
  );

  return (
    <>
      <h2>Example 2 - useEffect hook with mocked network request</h2>
      <p>Uses Mock Service Worker (MSW) to intercept network requests and return a mocked response.</p>
      <p>We setup the mock server in setupTests.js and create mock responses in mocks/handlers.js</p>
      <p>See: Animal.jsx / Animal.spec.jsx</p>
      <p>Note: The component displays an error now as the API is no longer available - https://zoo-animal-api.herokuapp.com/</p>
      <div className={styles.animal}>
        {errorMsg && <p>{errorMsg}</p>}
        {isLoading && <p className="loading">Loading...</p>}
        {!isLoading && animal.name ? animalDetails : ''}
        {isExterminated && newAnimal}
      </div>
    </>
  );
};

export default Animal;
