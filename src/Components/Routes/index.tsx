import React from 'react';
import { Route, Routes } from 'react-router-dom';
import App from '../../App';
import LoginPage from '../../pages/Login';
import SignUpPage from '../../pages/SignUp';
import Movie from '../../pages/Movie';
import Navbar from '../Navbar';
import Movies from '../../pages/Movies';
import Shows from '../../pages/Shows';
import Footer from '../Footer';
const RoutesComponent = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route index element={<App />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="movies" element={<Movies />} />
        <Route path="shows" element={<Shows />} />
        <Route path="/:type/item/:id" element={<Movie />} />
      </Routes>
      <Footer />
    </>

    // <Route path="invoices" element={<Invoices />} />
  );
};

export default RoutesComponent;
