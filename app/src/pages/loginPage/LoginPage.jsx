import React, { Fragment, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUsers } from "@components/hooks";
import { ArrowLogin, PodProseLogo, GithubLogo, XLogo, GoogleLogo } from "@components/svg";

import "./LoginPage.css";

const LoginPage = () => {
  const {
    email,
    updateEmail,
    password,
    updatePassword,
    username,
    updateUsername,
    handleLogin,

    errorUsuario,
    actualizarErrorUsuario,
  } = useUsers();

  return (
    <Fragment>
      <header className="login-header">
        <Link
          onClick={() => actualizarErrorUsuario("")}
          to="/register"
          className="login-header-back"
        >
          <ArrowLogin />
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
                  value={email}
                  onChange={(e) => {
                    updateEmail(e.target.value);
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
                  value={password}
                  onChange={(e) => {
                    updatePassword(e.target.value);
                  }}
                />
              </div>

              <input
                className="login-main-input-login"
                title="Iniciar Sesión"
                type="button"
                value="Iniciar Sesión"
                onClick={(e) => {
                  handleLogin(e);
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
