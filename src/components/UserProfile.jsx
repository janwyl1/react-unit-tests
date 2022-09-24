import { useContext } from 'react';

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

  return (
    <div className={styles.userprofile}>
      <h2>Example 3 - Context</h2>
      <p>{authCtx.isLoggedIn ? 'You are logged in' : 'You are logged out'}</p>
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
