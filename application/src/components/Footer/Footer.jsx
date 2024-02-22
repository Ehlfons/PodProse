import { Fragment } from "react";
import "./Footer.css";
import PodProseLogo from "../svg/PodProseLogo.jsx";
import InstagramLogo from "../svg/InstagramLogo.jsx";
import XLogo from "../svg/XLogo.jsx";
import GithubLogo from "../svg/GithubLogo.jsx";

const Footer = () => {
  return (
    <Fragment>
      <hr className="footer-greenline" />
      <footer>
        <div className="footer-cols">
          <div className="footer-col">
            <div className="container-footer-col-title">
              <PodProseLogo />
              <h4 className="footer-col-title">PodProse</h4>
            </div>
            <p className="footer-text">
              PodProse es narrativa pura. Cada episodio, una nueva aventura a
              descubrir.
            </p>
            <a className="footer-link" href="">
              ¡ DESCUBRE MÁS !
            </a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Contacto</h4>
            <hr className="footer-col-greenline" />
            <p className="footer-text">
              Contacta con nosotros y solucionaremos tus problemas y cuestiones
              lo antes posible!
            </p>
            <a className="footer-link" href="">
              ¡ CONTÁCTANOS !
            </a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Newsletter</h4>
            <hr className="footer-col-greenline" />
            <p className="footer-text">
              Suscríbete gratuitamente a nuestro Newsletter para tener toda la
              información de tus creadores favoritos.
            </p>
            <a className="footer-link" href="">
              ¡ SUSCRIBETE !
            </a>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Redes Sociales</h4>
            <hr className="footer-col-greenline" />
            <p className="footer-text">
              Síguenos en todas nuestras redes sociales para estar al tanto de
              las nuevas actualizaciones!
            </p>
            <div className="footer-icons">
              <InstagramLogo />
              <XLogo />
              <GithubLogo />
            </div>
          </div>
        </div>
        <hr className="footer-separator-greenline" />
        <small>
          <p className="footer-copyright">
            Creado por SSS <em className="middot">&middot;</em> Copyright 2024{" "}
            <em className="middot">&middot;</em> Todos los derechos reservados
          </p>
          <div className="footer-terms">
            <a href="">Política de Privacidad</a>
            <a href="">Términos y Condiciones</a>
          </div>
        </small>
      </footer>
    </Fragment>
  );
};

export default Footer;
