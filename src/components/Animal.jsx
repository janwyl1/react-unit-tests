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
      <h1>{animal.name}</h1>
      <h2>{animal.animal_type}</h2>
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
      <p>😭 You Monster! Fetch a new animal?</p>
      <button onClick={() => sendRequest()}>New Animal</button>
    </div>
  );

  return (
    <>
      <h2>Example 2 - useEffect hook with mocked network request</h2>
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
