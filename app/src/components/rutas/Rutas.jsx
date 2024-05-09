import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage, LoginPage, RegisterPage, CreatorPage, ContactPage } from "@pages/index";

const Rutas = () => {
  return (
    <Fragment>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/creator' element={<CreatorPage />} />
        <Route path='/contact' element={<ContactPage />} />
      </Routes>
    </Fragment>
  );
};

export default Rutas;