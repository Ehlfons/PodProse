import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import Login from "./Login/Login.jsx";
import Logo from "./Logo/Logo.jsx";
import Nav from "./Nav/Nav.jsx";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  
  if (isLoginPage) {
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