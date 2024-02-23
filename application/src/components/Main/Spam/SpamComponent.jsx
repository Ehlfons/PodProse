import { Fragment } from "react";
import "./SpamComponent.css";
import InstagramLogo from "../../svg/InstagramLogo.jsx";
import XLogo from "../../svg/XLogo.jsx";
import GithubLogo from "../../svg/GithubLogo.jsx";

const SpamComponent = () => {
  return (
    <Fragment>
      <div id="container-spam">
        <div id="social-media-spam">
          <h2 className="titles-spam">Síguenos en nuestras redes:</h2>
          <div className="social-media-logos-spam">
            <InstagramLogo />
            <XLogo />
            <GithubLogo />
          </div>
        </div>
        <div id="social-newsletter-spam">
          <h2 className="titles-spam">PodProse Newsletter</h2>
          <p>Suscríbete gratuitamente para estar al tanto de todo!</p>
          <input
            className="input-spam"
            type="email"
            name="email"
            id="email"
            placeholder="Introduce tu correo electrónico"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SpamComponent;
