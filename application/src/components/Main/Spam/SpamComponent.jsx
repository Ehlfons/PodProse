import { Fragment } from "react";
import InstagramLogo from "../../svg/InstagramLogo.jsx";
import XLogo from "../../svg/XLogo.jsx";
import GithubLogo from "../../svg/GithubLogo.jsx";
import "./SpamComponent.css";

const SpamComponent = () => {
  return (
    <Fragment>
      <section id="container-spam">
        <div className="spam-wrapper">
          <div id="social-media-spam">
            <h2 className="titles-spam">Síguenos en nuestras redes</h2>
            <div className="social-media-logos-spam">
              <div className="container-instagram-logo-spam">
                <hr className="spam-logo-greenLine" />
                <InstagramLogo />
              </div>
              <div className="container-x-logo-spam">
                <hr className="spam-logo-greenLine" />
                <XLogo />
              </div>
              <div className="container-github-logo-spam">
                <hr className="spam-logo-greenLine" />
                <GithubLogo />
              </div>
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
      </section>
    </Fragment>
  );
};

export default SpamComponent;
