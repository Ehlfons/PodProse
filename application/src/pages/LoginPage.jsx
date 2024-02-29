import React, { Fragment, useEffect } from "react";
import useUsuarios from "../hooks/useUsuarios.jsx";
import { Link, useNavigate } from "react-router-dom";
import ArrowLogin from "../components/svg/ArrowLogin.jsx";
import PodProseLogo from "../components/svg/PodProseLogo.jsx";
import GithubLogo from "../components/svg/GithubLogo.jsx";
import XLogo from "../components/svg/XLogo.jsx";
import GoogleLogo from "../components/svg/GoogleLogo.jsx";
import "./LoginPage.css";

const LoginPage = () => {
  const {
    iniciarSesion,
    actualizarDato,
    errorUsuario,
    actualizarErrorUsuario,
    confirmacionInicioSesion,
  } = useUsuarios();

  const navigate = useNavigate();

  const manejarInicioSesion = async (e) => {
    e.preventDefault();
    iniciarSesion();
    actualizarErrorUsuario("");
  };

  // Redirigir al usuario a la página principal si se ha iniciado sesión correctamente.
  useEffect(() => {
    if (confirmacionInicioSesion) {
      navigate("/");
    }
  }, [confirmacionInicioSesion, navigate]);

  return (
    <Fragment>
      <header className="login-header">
        <Link to="/" className="login-header-back">
          <ArrowLogin />
          <p>Volver</p>
        </Link>
        <Link
          onClick={() => actualizarErrorUsuario("")}
          to="/register"
          className="login-header-register"
        >
          Crear una cuenta
        </Link>
      </header>
      <section className="login-main">
        <div className="login-main-title">
          <PodProseLogo />
          <h1>Iniciar Sesión</h1>
        </div>
        <div className="login-main-form">
          <div className="login-main-inputs">
            <div className="login-main-inputs-wrapper">
              <div className="login-main-input-email">
                <label htmlFor="email">Usuario / Correo Electrónico</label>
                <input
                  className="login-main-common-input"
                  title="Email"
                  type="email"
                  id="email"
                  name="email"
                  onChange={(e) => {
                    actualizarErrorUsuario("");
                    actualizarDato(e);
                  }}
                />
              </div>

              <div className="login-main-input-passwd">
                <label htmlFor="password">Contraseña</label>
                <input
                  className="login-main-common-input"
                  title="Contraseña"
                  type="password"
                  id="password"
                  name="password"
                  onChange={(e) => {
                    actualizarErrorUsuario("");
                    actualizarDato(e);
                  }}
                />
              </div>

              <input
                className="login-main-input-login"
                title="Iniciar Sesión"
                type="button"
                value="Iniciar Sesión"
                onClick={(e) => {
                  manejarInicioSesion(e);
                }}
              />
            </div>
            {errorUsuario && (
              <div className="error-usuario">{errorUsuario}</div>
            )}
          </div>
          <div className="login-main-separator">
            <p>o</p>
          </div>
          <div className="login-main-options">
            <div className="login-main-options-wrapper">
              <button className="login-main-option-google">
                <GoogleLogo />
                <p>Continuar con Google</p>
              </button>
              <button className="login-main-option-github">
                <GithubLogo />
                <p>Continuar con Github</p>
              </button>
              <button className="login-main-option-x">
                <XLogo />
                <p>Continuar con X</p>
              </button>
            </div>
          </div>
        </div>
        <div className="login-main-footer">
          <p className="login-main-footer-passwd">¿Olvidaste tu contraseña?</p>
          <p className="login-main-footer-terms">
            Inicio de Sesión Seguro con 2FA sujeto a los Términos y Privacidad
            de Google
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default LoginPage;
