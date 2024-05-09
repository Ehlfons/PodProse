import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Login from "./login/Login.jsx";
import Logo from "./logo/Logo.jsx";
import Nav from "./nav/Nav.jsx";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  
  if (isLoginPage || isRegisterPage) {
    return null;
  }
  return (
    <Fragment>
      <header>
        <Logo />
        <Nav />
        <Login />
      </header>
    </Fragment>
  );
};

export default Header;