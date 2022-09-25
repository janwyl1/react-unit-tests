import { beforeEach, describe, expect, it } from 'vitest';

import { render, screen, userEvent } from '../../test-utils';
import { AuthContextProvider } from '../context/authContext';
import UserProfile from './UserProfile';

describe('User profile', () => {
    beforeEach(() => {
      // set auth token
      global.localStorage.setItem('isLoggedIn', "1")

      // This component uses 2 contexts: authContext which is wrapped around <UserProfile> in app.js, and colorContext which is global and wrapped around all components in app.js
      // Without access to the contexts, the test would fail
      // The render method we use here is overriden by a custom method thats defined in test-utils.js. You can add any global context providers there (as we've done with ColorContextProvider)
      render(
        <AuthContextProvider>
          <UserProfile />
        </AuthContextProvider>
      );
    });

    afterEach(() => {
      global.localStorage.clear()
    })

    it('User is logged in automatically if auth token is already set', async () => {
      // Check that logged in text and logout button are visible
      const loggedInTxt = screen.getByText('You are logged in');
      const logoutBtn = screen.getByRole('button', {
        name: /log out/i,
      });
      expect(loggedInTxt).toBeVisible();
      expect(logoutBtn).toBeVisible();

      // Check that logged out text and login button are not visible
      const loggedOutTxt = screen.queryByText('You are logged out')
      const loginBtn = screen.queryByRole('button', {
        name: /log in/i
      })
      expect(loggedOutTxt).not.toBeInTheDocument()
      expect(loginBtn).not.toBeInTheDocument()
    })

    it('User is logged out successfully when logout button is clicked', async () => {
      // Click the logout button
      const logoutBtn = screen.getByRole('button', {
        name: /log out/i,
      });
      await userEvent.click(logoutBtn)

      // Check that logged out text and login button are visible
      const loggedOutTxt = screen.getByText('You are logged out')
      const loginBtn = screen.getByRole('button', {
        name: /log in/i
      })
      expect(loggedOutTxt).toBeVisible() 
      expect(loginBtn).toBeVisible() 
    })

    it('User is logged in successfully when login button is clicked', async () => {
      // Click the logout button
      const logoutBtn = screen.getByRole('button', {
        name: /log out/i,
      });
      await userEvent.click(logoutBtn)

      // Click the login button
      const loginBtn = screen.getByRole('button', {
        name: /log in/i
      })
      await userEvent.click(loginBtn)
      
      // Check that logged in text is visible 
      const loggedInTxt = screen.getByText('You are logged in');
      expect(loggedInTxt).toBeVisible();
    })
});
