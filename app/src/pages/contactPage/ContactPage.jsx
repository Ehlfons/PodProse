import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ContactPage.css";
import "../../assets/font-awesome/6.0.0-alpha2/css/all.css";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [hoveredIcon, setHoveredIcon] = useState(null);

  const apiURL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiURL}/contact`, formData);
      alert("Correo enviado correctamente");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Error al enviar el correo electrónico");
    }
  };

  return (
    <div id="contactPageContainer">
      <div id="contactPageForm">
        <h1 className="contactText">Contacto</h1>
        <p className="secondary">Envíanos un mensaje</p>
        <form onSubmit={handleSubmit}>
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="fullName">Nombre Completo:</label>
              <input
                className="formTextSpaces"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email:</label>
              <input
                className="formTextSpaces"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="phone">Teléfono:</label>
              <input
                className="formTextSpaces"
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="subject">Asunto:</label>
              <input
                className="formTextSpaces"
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div className="formGroup" id="formGroupLast">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                className="formTextSpaces"
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
          </div>
          <input type="submit" id="sendFormButton" value="Enviar" />
        </form>
      </div>
      <div id="contactPageContainerCeo">
        <div className="firstCeo">
          <h2 className="ceosText">Sergio Sánchez</h2>
          <img
            className="ceoImageContact"
            src="https://i.ibb.co/nkJpBJX/120760753-1.png"
            alt=""
          />
          <h1 className="rankText">CEO</h1>
          <div className="socialNetworksAdmins">
            <a
              href="https://github.com/LitoHDD"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fa-brands fa-github fa-4x ${
                  hoveredIcon === "github2"
                    ? "fa-beat-fade socialNetworksAdminsEffects"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIcon("github2")}
                onMouseLeave={() => setHoveredIcon(null)}
              ></i>
            </a>
            <i className={"fa-thin fa-pipe fa-4x"}></i>
            <a
              href="https://www.linkedin.com/in/litohdd/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fa-brands fa-linkedin fa-4x ${
                  hoveredIcon === "linkedin2"
                    ? "fa-beat-fade socialNetworksAdminsEffects"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIcon("linkedin2")}
                onMouseLeave={() => setHoveredIcon(null)}
              ></i>
            </a>
          </div>
        </div>
        <div className="secondCeo">
          <h2 className="ceosText">Sergio Alfonso</h2>
          <img
            className="ceoImageContact"
            src="https://avatars.githubusercontent.com/u/145800843?v=4"
            alt=""
          />
          <h1 className="rankText">CEO</h1>
          <div className="socialNetworksAdmins">
            <a
              href="https://github.com/Ehlfons"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fa-brands fa-github fa-4x ${
                  hoveredIcon === "github1"
                    ? "fa-beat-fade socialNetworksAdminsEffects"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIcon("github1")}
                onMouseLeave={() => setHoveredIcon(null)}
              ></i>
            </a>
            <i className={"fa-thin fa-pipe fa-4x"}></i>
            <a
              href="https://www.linkedin.com/in/sergio-alfonso-deltell/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i
                className={`fa-brands fa-linkedin fa-4x ${
                  hoveredIcon === "linkedin1"
                    ? "fa-beat-fade socialNetworksAdminsEffects"
                    : ""
                }`}
                onMouseEnter={() => setHoveredIcon("linkedin1")}
                onMouseLeave={() => setHoveredIcon(null)}
              ></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
