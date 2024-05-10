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
              <Link to="/">Explorar</Link> {/* esto será un desplegable en el que aparecerá un search para creadores y podcasts, y las categorías (con posibilidad de filtro directo). */}
            </li>
            <li>
              <Link to="/contact">Contacto</Link>
            </li>
          </ul>
        </nav>
      </div>
    </Fragment>
  );
};

export default Nav;
