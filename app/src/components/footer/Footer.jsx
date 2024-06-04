import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useUsers } from "@components/hooks";

import {
  PodProseLogo,
  InstagramLogo,
  XLogo,
  GithubLogo,
} from "@components/svg";
import "./Footer.css";

const Footer = () => {
  const { updateIsLoading } = useUsers();

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
            <Link
              className="footer-link"
              to="/explore"
              onClick={() => {
                updateIsLoading(true);
                setTimeout(() => {
                  updateIsLoading(false);
                }, 1500);
              }}
            >
              ¡ DESCUBRE MÁS !
            </Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Contacto</h4>
            <hr className="footer-col-greenline" />
            <p className="footer-text">
              Contacta con nosotros y solucionaremos tus problemas y cuestiones
              lo antes posible!
            </p>
            <Link
              to="/contact"
              className="footer-link"
              onClick={() => {
                updateIsLoading(true);
                setTimeout(() => {
                  updateIsLoading(false);
                }, 1500);
              }}
            >
              ¡ CONTÁCTANOS !
            </Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Newsletter</h4>
            <hr className="footer-col-greenline" />
            <p className="footer-text">
              Suscríbete gratuitamente a nuestro Newsletter para tener toda la
              información de tus creadores favoritos.
            </p>
            <Link
              className="footer-link"
              to="/home#container-spam"
              onClick={() => {
                updateIsLoading(true);
                setTimeout(() => {
                  updateIsLoading(false);
                }, 1500);
              }}
            >
              ¡SUSCRÍBETE!
            </Link>
          </div>
          <div className="footer-col">
            <h4 className="footer-col-title">Redes Sociales</h4>
            <hr className="footer-col-greenline" />
            <p className="footer-text">
              Síguenos en todas nuestras redes sociales para estar al tanto de
              las nuevas actualizaciones!
            </p>
            <div className="footer-icons">
              <a href="https://www.instagram.com/podprose.official">
                <InstagramLogo />
              </a>
              <a href="https://www.x.com/podprose">
                <XLogo />
              </a>
              <a href="https://github.com/LitoHDD/PodProse">
                <GithubLogo />
              </a>
            </div>
          </div>
        </div>
        <hr className="footer-separator-greenline" />
        <small>
          <p className="footer-copyright">
            Creado por SSS<em className="middot">&middot;</em>Copyright 2024
            <em className="middot">&middot;</em>Todos los derechos reservados
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
