import React, { Fragment } from "react";
import useUsuarios from "../hooks/useUsuarios.jsx";
import { Link, useNavigate } from "react-router-dom";
import ArrowLogin from "../components/svg/ArrowLogin.jsx";
import PodProseLogo from "../components/svg/PodProseLogo.jsx";
import GithubLogo from "../components/svg/GithubLogo.jsx";
import XLogo from "../components/svg/XLogo.jsx";
import GoogleLogo from "../components/svg/GoogleLogo.jsx";
import "./RegisterPage.css";

const RegisterPage = () => {
  const { actualizarDato, errorUsuario, registro } = useUsuarios();

  // Lógica para el evento onClick del botón de registro.
  const manejarRegistro = (e) => {
    e.preventDefault();
    registro();
  };

  const navigate = useNavigate();
  return (
    <Fragment>
      <header className="register-header">
        <Link to="/" className="register-header-back">
          <ArrowLogin />
          <p>Volver</p>
        </Link>
        <Link to="/login" className="register-header-login">
          Login
        </Link>
      </header>
      <section className="register-main">
        <div className="register-main-title">
          <PodProseLogo />
          <h1>Crea una cuenta</h1>
        </div>
        <div className="register-main-form">
          <div className="register-main-inputs">
            <div className="register-main-inputs-wrapper">
              <div className="register-main-input-email">
                <label htmlFor="email">Usuario / Correo Electrónico</label>
                <input
                  className="register-main-common-input"
                  type="email"
                  title="Email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    actualizarDato(e);
                  }}
                />
              </div>

              <div className="register-main-input-passwd">
                <label htmlFor="password">Contraseña</label>
                <input
                  className="register-main-common-input"
                  title="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    actualizarDato(e);
                  }}
                />
              </div>

              <input
                className="register-main-input-register"
                title="Registrarse"
                type="button"
                value="Registrarse"
                onClick={(e) => {
                  manejarRegistro(e);
                }}
              />
            </div>
            {errorUsuario && (
              <div className="error-usuario">{errorUsuario}</div>
            )}
          </div>
          <div className="register-main-separator">
            <p>o</p>
          </div>
          <div className="register-main-options">
            <div className="register-main-options-wrapper">
              <button className="register-main-option-google">
                <GoogleLogo />
                <p>Continuar con Google</p>
              </button>
              <button className="register-main-option-github">
                <GithubLogo />
                <p>Continuar con Github</p>
              </button>
              <button className="register-main-option-x">
                <XLogo />
                <p>Continuar con X</p>
              </button>
            </div>
          </div>
        </div>
        <div className="register-main-footer">
          <a
            className="register-main-footer-passwd"
            onClick={() => {
              navigate("/login");
            }}
          >
            ¿Ya estás registrado?
          </a>
          <p className="register-main-footer-terms">
            Registro Seguro con 2FA sujeto a los Términos y Privacidad de Google
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default RegisterPage;
