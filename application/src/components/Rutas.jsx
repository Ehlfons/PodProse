import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage.jsx";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<MainPage />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;