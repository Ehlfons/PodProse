import React, { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUsers } from "@components/hooks";
import { toast } from "sonner";

import { ArrowLogin, PodProseLogo } from "@components/svg";
import "./RegisterPage.css";

const RegisterPage = () => {
  const {
    username,
    updateUsername,
    name,
    updateName,
    email,
    updateEmail,
    password,
    updatePassword,
    updateShowForgotPassword,
    manejarRegistro,
  } = useUsers();

  return (
    <Fragment>
      <main>
        <header className="register-header">
          <Link
            to="/login"
            className="register-header-back"
            onClick={() => updateShowForgotPassword(false)}
          >
            <ArrowLogin />
            Iniciar sesión
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
                  <label htmlFor="name">Nombre</label>
                  <input
                    className="register-main-common-input"
                    type="text"
                    title="name"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      updateName(e.target.value);
                    }}
                  />
                </div>
                <div className="register-main-input-email">
                  <label htmlFor="username">Usuario</label>
                  <input
                    className="register-main-common-input"
                    type="text"
                    title="Username"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => {
                      updateUsername(e.target.value);
                    }}
                  />
                </div>

                <div className="register-main-input-email">
                  <label htmlFor="email">Correo electrónico</label>
                  <input
                    className="register-main-common-input"
                    type="email"
                    title="Email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                      updateEmail(e.target.value);
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
                    value={password}
                    onChange={(e) => {
                      updatePassword(e.target.value);
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
            </div>
          </div>
          <div className="register-main-footer">
            <Link
              to="/login"
              className="register-main-footer-passwd"
              onClick={() => updateShowForgotPassword(false)}
            >
              ¿Ya estás registrado?
            </Link>
            <p className="register-main-footer-terms">
              Registro Seguro con 2FA sujeto a los Términos y Privacidad de
              Google
            </p>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default RegisterPage;
