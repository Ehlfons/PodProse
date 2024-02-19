import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => {
  return (
    <Fragment>
      <div id="nav">
        <nav>
          <ul>
            <li>
              <Link to="/">Inicio</Link>
            </li>
            <li>
              <Link /* to="/Explorar" */>Explorar</Link>
            </li>
            <li>
              <Link /* to="/Contacto" */>Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Nav;
