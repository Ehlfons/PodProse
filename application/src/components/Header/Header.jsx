import { Fragment } from "react";
import Login from "./Login/Login.jsx";
import Logo from "./Logo/Logo.jsx";
import Nav from "./Nav/Nav.jsx";
import "./Header.css";

const Header = () => {
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