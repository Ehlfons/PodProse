import React from "react";
import "./Footer.css";
import podProseLogo from "../../assets/PodProse_Logo_Green.svg";

const Footer = () => {
  return (
    <footer>
      <div>
        <div className="container-footer-title">
          <img src={podProseLogo} alt="PodProse Logo" />
          <h2>PodProse</h2>
        </div>
        <p className="footer-text">
          PodProse es narrativa pura. Cada episodio, una nueva aventura a
          descubrir.
        </p>
        <a href="">¡DESCUBRE MÁS!</a>
      </div>
      <div>
        <h2>Contacto</h2>
        <p className="footer-text">
          Contacta con nosotros y solucionamos tus problemas y cuestionamos los
          antes posible!
        </p>
        <a href="">¡CONTÁCTANOS!</a>
      </div>
      <div>
        <h2>Newsletter</h2>
        <p className="footer-text">
          Suscríbete gratuitamente a nuestro Newsletter para tener toda la
          información de tus creadores favoritos.
        </p>
        <a href="">¡SUSCRIBETE!</a>
      </div>
      <div>
        <h2>Redes Sociales</h2>
        <p className="footer-text">
          Síguenos en todas nuestras redes sociales para estar al tanto de las
          nuevas actualizaciones!
        </p>
        <a href="">
          <p>LOGITOS</p>
        </a>
      </div>
    </footer>
  );
};

export default Footer;
