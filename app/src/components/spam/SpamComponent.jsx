import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // Importa tu librería de notificaciones
import { GithubLogo, InstagramLogo, XLogo } from "@components/svg";
import "./SpamComponent.css";

const SpamComponent = () => {
  const [email, setEmail] = useState("");
  const apiURL = import.meta.env.VITE_API_URL;

  const handleSubscribe = async () => {
    try {
      const response = await axios.post(`${apiURL}/newsletter/subscribe`, {
        email,
      });
      if (response.status === 201) {
        toast.success("Te has suscrito correctamente a nuestro newsletter");
        setEmail("");
      }
    } catch (error) {
      toast.error("Este correo ya está suscrito a nuestro newsletter");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubscribe();
    }
  };

  return (
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Introduce tu correo electrónico"
          />
        </div>
      </div>
    </section>
  );
};

export default SpamComponent;
