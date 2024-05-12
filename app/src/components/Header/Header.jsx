import { Fragment } from "react";
import { useLocation } from "react-router-dom";

import { Logo, Nav, Login } from "@components/header";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
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