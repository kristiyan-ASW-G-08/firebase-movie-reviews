import Navbar from '.';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { auth } from '../../firebase';
jest.mock('../../firebase');

const authMock = auth as jest.Mocked<typeof auth>;

describe('Navbar', () => {
  it('render authenticated', async () => {
    //@ts-ignore
    authMock.onAuthStateChanged.mockImplementation(func => func(true));
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    await waitFor(() => {
      const logoutButtons = screen.getAllByText('Log Out');
      expect(logoutButtons[0]).toBeInTheDocument();
    });
  });
  it('render unauthenticated', async () => {
    //@ts-ignore
    authMock.onAuthStateChanged.mockImplementation(func => func(false));
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );
    await waitFor(() => {
      const loginButtons = screen.getAllByText('Login');

      expect(loginButtons[0]).toBeInTheDocument();

    });
    await waitFor(() => {
      const signUpButtons = screen.getAllByText('Sign Up');
      expect(signUpButtons[0]).toBeInTheDocument();
    });
  });
});
