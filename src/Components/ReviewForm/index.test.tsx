// Todo: Figure out how to mock firebase functions
// import { render, screen, waitFor } from '@testing-library/react';
// import { BrowserRouter } from 'react-router-dom';
// import { auth } from '../../firebase';
// import { getFirestore, addDoc, collection } from 'firebase/firestore';
// import UserEvent from '@testing-library/user-event';
// import ReviewForm from '.';
// jest.mock('../../firebase');
// jest.mock('firebase/firestore');
// const authMock = auth as jest.Mocked<typeof auth>;
// const addDocMOck = addDoc as jest.MockedFunction<typeof addDoc>


// describe('ReviewForm', () => {
//   jest.setTimeout(30000);
//   afterAll(() => jest.restoreAllMocks());
//   it('renders', async () => {
//     // expect.assertions(8);
//     const movieId = 100;
//     const { getByText } = render(<ReviewForm movieId={movieId} />, {
//       wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
//     });
//     const value =
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
//     const input = screen.getByTestId('content');
//     UserEvent.type(input, value);
//     expect(input).toHaveAttribute('value', value);

//     const postButton = screen.getByText('Post');

//     UserEvent.click(postButton);
//   });
// });
