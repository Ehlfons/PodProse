import { Fragment, useState } from "react";
import { toast } from "sonner";
import axios from "axios";

import { GithubLogo, InstagramLogo, XLogo } from "@components/svg";
import "./SpamComponent.css";

const SpamComponent = () => {
  const [email, setEmail] = useState("");

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/newsletter/subscribe",
        { email }
      );
      if (response.status === 201) {
        toast.success("Suscripción exitosa!");
        setEmail(""); // Limpiar el campo de email después de suscribirse
      }
    } catch (error) {
      toast.error("Error al suscribirse. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Fragment>
      <section id="container-spam">
        <div className="spam-wrapper">
          <div id="social-media-spam">
            <h2 className="titles-spam">Síguenos en nuestras redes</h2>
            <div className="social-media-logos-spam">
              <div className="container-instagram-logo-spam">
                <hr className="spam-logo-greenLine" />
                <a href="https://www.instagram.com/podprose.official">
                  <InstagramLogo />
                </a>
              </div>
              <div className="container-x-logo-spam">
                <hr className="spam-logo-greenLine" />
                <a href="https://www.x.com/podprose">
                  <XLogo />
                </a>
              </div>
              <div className="container-github-logo-spam">
                <hr className="spam-logo-greenLine" />
                <a href="https://github.com/LitoHDD/PodProse">
                  <GithubLogo />
                </a>
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
              value={email}
              onChange={handleInputChange}
            />
            <button onClick={handleSubscribe}>Suscribirse</button>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default SpamComponent;
