import './App.css';

import Animal from './components/Animal';
import Counter from './components/Counter';
import Timer from './components/Timer';
import UserProfile from './components/UserProfile';
import AgeChecker from './components/AgeChecker'
import { AuthContextProvider } from './context/authContext';
import { ColorContextProvider } from './context/colorContext';

function App() {
  return (
    <ColorContextProvider>
      <div className="App">
        <h1>React Unit Testing Examples</h1>
        <hr />
        <Counter />
        <hr />
        <Animal apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
        <hr />
        <AuthContextProvider>
          <UserProfile />
        </AuthContextProvider>
        <hr />
        <h2>Example 4 - Custom hook</h2>
        <p>Uses renderHook and act to test a custom hook</p>
        <p>This custom hook isn't used in any components</p>
        <p>See: useCounter.js / useCounter.spec.js</p>
        <hr />
        <Timer />
        <hr />
        <AgeChecker />
      </div>
    </ColorContextProvider>
  );
}

export default App;
