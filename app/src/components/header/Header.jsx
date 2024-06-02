import { Fragment, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import { Logo, Nav, Login } from "@components/header";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const [visibilityMenu, setVisibilityMenu] = useState(false);
  const [iconActive, setIconActive] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(false);
  
  useEffect(() => {
    if (!isLoginPage && !isRegisterPage) {
      const handleResize = () => {
        if (window.innerWidth <= 813 && window.innerWidth > 800) {
          setVisibilityMenu(false);
          setIconActive(false);
          setTransitionEnabled(false);
        }
      };

      handleResize();

      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [isLoginPage, isRegisterPage]);
  if (isLoginPage || isRegisterPage) {
    return null;
  }

  const toggleMenu = () => {
    setTransitionEnabled(true);
    setVisibilityMenu(!visibilityMenu);
    setIconActive(!iconActive);
  };

  return (
    <Fragment>
      <header>
        <Logo />
        <Nav show={visibilityMenu} updateShow={setVisibilityMenu} updateIcon={setIconActive} transitionEnabled={transitionEnabled} />
        <div className="header-icons">
          <Login />
          <div onClick={() => toggleMenu()} >
            <label className="hamburger">
              <button className={iconActive ? "active" : undefined} onClick={() => setIconActive(!iconActive)}>
              <svg viewBox="0 0 32 32">
                <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                <path className="line" d="M7 16 27 16"></path>
              </svg>
              </button>
            </label>
          </div>
        </div>
      </header>
    </Fragment>
  );
};

export default Header;