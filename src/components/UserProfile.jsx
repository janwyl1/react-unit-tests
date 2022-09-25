import { useContext, useEffect } from 'react';

import AuthContext from '../context/authContext';
import ColorContext from '../context/colorContext';
import styles from './UserProfile.module.css';

const UserProfile = () => {
  const authCtx = useContext(AuthContext);
  const colorCtx = useContext(ColorContext);

  const loginHandler = () => {
    colorCtx.updateColor('red');
    authCtx.onLogin();
  };

  const logoutHandler = () => {
    colorCtx.updateColor('green');
    authCtx.onLogout();
  };

  useEffect(() => {
   authCtx.isLoggedIn ? colorCtx.updateColor('red') : colorCtx.updateColor('green')
  }, [authCtx.isLoggedIn])

  return (
    <div className={styles.userprofile}>
      <h2>Example 3 - Context</h2>
      <p>Uses 2 different context objects - authContext and colorContext.</p>
      <p>Our tests need access to these context objects which is demonstrated in 2 different ways:</p>
      <p>We wrap the AuthContext provider around the UserProfile component in our test's render method (in UserProfile.spec.jsx) - only tests defined in UserProfile.spec.jsx have access to this context.</p>
      <p>We create a custom render method that overrides react-testing-library's render method (in test-utils.js) - all our tests will have access to this context.</p>
      <h3>{authCtx.isLoggedIn ? 'You are logged in' : 'You are logged out'}</h3>
      {!authCtx.isLoggedIn && (
        <button onClick={loginHandler} style={{ background: colorCtx.color }}>
          Log In
        </button>
      )}
      {authCtx.isLoggedIn && (
        <button onClick={logoutHandler} style={{ background: colorCtx.color }}>
          Log Out
        </button>
      )}
    </div>
  );
};

export default UserProfile;
