import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';

import UserEvent from '@testing-library/user-event';
import LoginPage from '.';
jest.mock('firebase/firestore');

jest.mock('firebase/auth', () => ({
  ...jest.requireActual('firebase/auth'),
  signInWithEmailAndPassword: jest.fn(),
}));
describe('LoginPage', () => {
  jest.setTimeout(30000);
  afterAll(() => jest.restoreAllMocks());
  it('renders', async () => {
    const movieId = 100;
    const { getByText } = render(<LoginPage />, {
      wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });
    const email = 'email@somemail.com';
    // eslint-disable-next-line testing-library/no-node-access
    const emailInput = screen.getByTestId('email').querySelector('input');
    //@ts-ignore
    UserEvent.type(emailInput, email);

    const password = 'password';
    // eslint-disable-next-line testing-library/no-node-access
    const passwordInput = screen.getByTestId('password').querySelector('input');
    //@ts-ignore
    UserEvent.type(passwordInput, password);

    const loginBUtton = screen.getByText('Login');

    UserEvent.click(loginBUtton);

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledTimes(1);
    });
  });
});
