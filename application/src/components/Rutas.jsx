import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;