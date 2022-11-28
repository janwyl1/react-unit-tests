import './App.css';
import { Router, Link } from "@reach/router"

import Animal from './components/Animal';
import Counter from './components/Counter';
import Timer from './components/Timer';
import UserProfile from './components/UserProfile';
import AgeChecker from './components/AgeChecker'
import { AuthContextProvider } from './context/authContext';
import { ColorContextProvider } from './context/colorContext';
import CustomHook from './components/CustomHook'

function App() {
  return (
    <div className="App">
        <h1>React Unit Testing Examples</h1>
        <nav>
          <Link to="/counter">1. Counter</Link>
          <Link to="/animal">2. Animal</Link>
          <Link to="/user-profile">3. User Profile</Link>
          <Link to="/custom-hook">4. Custom Hook</Link>
          <Link to="/timer">5. Timer</Link>
          <Link to="/age-checker">6. Age Checker</Link>
        </nav>
        <ColorContextProvider>
          <Router>
            <Counter path="counter" />
            <Animal path="animal" apiUrl="https://zoo-animal-api.herokuapp.com/animals/rand" />
            <CustomHook path="custom-hook" />
            <Timer path="timer" />
            <AgeChecker path="age-checker" />
          </Router>
          
          <AuthContextProvider>
            <Router>
              <UserProfile path="user-profile"/>
            </Router>
          </AuthContextProvider>
        </ColorContextProvider>
    </div>

  );
}

export default App