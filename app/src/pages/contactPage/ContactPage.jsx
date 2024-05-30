import { Fragment } from "react";
import { GithubLogo, LinkedinLogo } from "@components/svg";
import { useInfo } from "@components/hooks";
import "./ContactPage.css";

const ContactPage = () => {
  const { emailFormData, handleChangeEmailFormData, handleSubmitContactEmail } = useInfo();

  return (
    <Fragment>
      <main>
        <div id="contactPageContainer">
          <div id="contactPageForm">
            <h1 className="contactText">Contacto</h1>
            <p className="secondary">Envíanos un mensaje</p>
            <hr className="grey-separator" />
            <form>
              <div className="formRow">
                <div className="formGroup">
                  <label className="form-label-required" htmlFor="fullName">
                    Nombre Completo:
                  </label>
                  <input
                    className="formTextSpaces"
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={emailFormData.fullName}
                    onChange={handleChangeEmailFormData}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label className="form-label-required" htmlFor="email">
                    Email:
                  </label>
                  <input
                    className="formTextSpaces"
                    type="email"
                    id="email"
                    name="email"
                    value={emailFormData.email}
                    onChange={handleChangeEmailFormData}
                    required
                  />
                </div>
              </div>
              <div className="formRow">
                <div className="formGroup">
                  <label className="form-label-required" htmlFor="phone">
                    Teléfono:
                  </label>
                  <input
                    className="formTextSpaces"
                    type="tel"
                    id="phone"
                    name="phone"
                    value={emailFormData.phone}
                    onChange={handleChangeEmailFormData}
                    required
                  />
                </div>
                <div className="formGroup">
                  <label className="form-label-required" htmlFor="subject">
                    Asunto:
                  </label>
                  <input
                    className="formTextSpaces"
                    type="text"
                    id="subject"
                    name="subject"
                    value={emailFormData.subject}
                    onChange={handleChangeEmailFormData}
                    required
                  />
                </div>
              </div>
              <div>
                <div className="formGroup" id="formGroupLast">
                  <label className="form-label-required" htmlFor="message">
                    Mensaje:
                  </label>
                  <textarea
                    className="formTextSpaces"
                    id="message"
                    name="message"
                    value={emailFormData.message}
                    onChange={handleChangeEmailFormData}
                    required
                  ></textarea>
                </div>
              </div>
              <div className="form-sendbtn-container">
                <p>obligatorio</p>
                <button onClick={handleSubmitContactEmail} id="sendFormButton">
                  Enviar
                </button>
              </div>
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
                  <GithubLogo />
                </a>
                <div className="vertical-line" />
                <a
                  href="https://www.linkedin.com/in/litohdd/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinLogo />
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
                  <GithubLogo />
                </a>
                <div className="vertical-line" />
                <a
                  href="https://www.linkedin.com/in/sergio-alfonso-deltell/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedinLogo />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default ContactPage;
