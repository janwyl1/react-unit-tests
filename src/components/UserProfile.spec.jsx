import { beforeEach, describe, expect, it } from 'vitest';

import { render, screen, userEvent } from '../../test-utils';
import { AuthContextProvider } from '../context/authContext';
import UserProfile from './UserProfile';

describe('User profile', () => {
  beforeEach(() => {
    // This component uses 2 contexts: authContext which is wrapped around <UserProfile> in app.js, and colorContext which is global and wrapped around all components in app.js
    // Without access to the contexts, the test would fail
    // The render method we use here is overriden by a custom method thats defined in test-utils.js. You can add any global context providers there (as we've done with ColorContextProvider)
    render(
      <AuthContextProvider>
        <UserProfile />
      </AuthContextProvider>
    );
  });
  it('Login button is visible when user is logged out', async () => {
    const loginBtn = screen.getByRole('button', {
      name: /log in/i,
    });
    expect(loginBtn).toBeVisible();
  });

  it('Login button is not visible when user is logged in', async () => {
    const loginBtn = screen.getByRole('button', {
      name: /log in/i,
    });

    await userEvent.click(loginBtn);
    expect(loginBtn).not.toBeInTheDocument();
  });

  it('Logout button is visible when user is logged in', async () => {
    const loginBtn = screen.getByRole('button', {
      name: /log in/i,
    });

    await userEvent.click(loginBtn);

    const logoutBtn = screen.getByRole('button', {
      name: /log out/i,
    });
    expect(logoutBtn).toBeVisible();
  });

  it('Logout button is not visible when user is logged out', async () => {
    const logoutBtn = screen.queryByRole('button', {
      name: /log out/i,
    });
    expect(logoutBtn).not.toBeInTheDocument();
  });

  it('Correct helper text is displayed when user is logged in or logged out', async () => {
    const loggedOutTxt = screen.getByText('You are logged out');
    expect(loggedOutTxt).toBeVisible();

    const loginBtn = screen.getByRole('button', {
      name: /log in/i,
    });
    userEvent.click(loginBtn);

    const loggedInTxt = await screen.findByText('You are logged in');
    expect(loggedInTxt).toBeVisible();
  });

  it('User is logged out successfully when log out button is pressed', async () => {
    const loginBtn = screen.getByRole('button', {
      name: /log in/i,
    });
    userEvent.click(loginBtn);

    const logoutBtn = await screen.findByRole('button', {
      name: /log out/i,
    });
    await userEvent.click(logoutBtn);

    const loggedOutTxt = screen.getByText('You are logged out');
    expect(loggedOutTxt).toBeVisible();
  });
});
