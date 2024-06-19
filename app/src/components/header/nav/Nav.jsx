import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "@components/hooks";

import "./Nav.css";

const Nav = ({show, updateShow, updateIcon, transitionEnabled}) => {

  const { updateIsLoading } = useUsers();

  const handleClick = () => {
    updateIsLoading(true);
    updateShow(false);
    updateIcon(false);

    setTimeout(() => {
      updateIsLoading(false);
    }, 1500);
  }

  return (
    <Fragment>
      <div className={`nav ${show ? "show" : ""} ${transitionEnabled ? "nav-transition" : ""}`}>
        <nav>
          <ul>
            <li onClick={handleClick}>
              <Link to="/home">Inicio</Link>
            </li>
            <li onClick={handleClick}>
              <Link to="/explore">Explorar</Link>
            </li>
            <li onClick={handleClick}>
              <Link to="/contact">Contacto</Link>
            </li>
            <li onClick={handleClick} className="profile-link-hide">
              <Link to="/profile">Perfil</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Nav;
