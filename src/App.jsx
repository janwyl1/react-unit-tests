import './App.css';

import Animal from './components/Animal';
import Counter from './components/Counter';
import Timer from './components/Timer';
import UserProfile from './components/UserProfile';
import { AuthContextProvider } from './context/authContext';
import { ColorContextProvider } from './context/colorContext';

function App() {
  return (
    <ColorContextProvider>
      <div className="App">
        <Counter />
        <hr />
        <Animal apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
        <hr />
        <AuthContextProvider>
          <UserProfile />
        </AuthContextProvider>
        <hr />
        <h2>Example 4 - Custom hook</h2>
        <p>See useCounter.js / useCounter.spec.js</p>
        <hr />
        <Timer />
      </div>
    </ColorContextProvider>
  );
}

export default App;
