import React from "react";
import "./ContactPage.css";

const ContactPage = () => {
  return (
    <div id="contactPageContainer">
      <div id="contactPageForm">
        <h1 className="contactText">CONTACTO</h1>
        <p className="contactText secondary">Envianos un mensaje</p>
        <form>
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="fullName">Nombre Completo:</label>
              <input
                className="formTextSpaces"
                type="text"
                id="fullName"
                name="fullName"
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
                required
              />
            </div>
          </div>
          <div className="formRow">
            <div className="formGroup">
              <label htmlFor="message">Mensaje:</label>
              <textarea
                className="formTextSpaces"
                id="message"
                name="message"
                required
              ></textarea>
            </div>
          </div>
          <button id="sendFormButton" type="submit">
            Enviar
          </button>
        </form>
      </div>
      <div id="contactPageContainerCeo">
        <div className="firstCeo">
          <h2 className="ceosText">Sergio Alfonso</h2>
          <img
            className="ceoImageContact"
            src="https://avatars.githubusercontent.com/u/145800843?v=4"
            alt=""
          />
          <h1 className="rankText">CEO</h1>
        </div>
        <div className="secondCeo">
          <h2 className="ceosText">Sergio Sánchez</h2>
          <img
            className="ceoImageContact"
            src="https://i.ibb.co/nkJpBJX/120760753-1.png"
            alt=""
          />
          <h1 className="rankText">CEO</h1>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
