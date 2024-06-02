import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUsers } from "@components/hooks";
import {
  ArrowLogin,
  PodProseLogo,
  GithubLogo,
  XLogo,
  GoogleLogo,
} from "@components/svg";
import { toast } from "sonner";
import axios from "axios";
import "./LoginPage.css";

const LoginPage = () => {
  const {
    email,
    updateEmail,
    password,
    updatePassword,
    handleLogin,
    googleLogin,
  } = useUsers();

  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (localStorage.getItem("emailVerified")) {
      toast.success("Correo verificado correctamente");
      localStorage.removeItem("emailVerified");
    }
    if (localStorage.getItem("passwordReset")) {
      toast.success("Contraseña restablecida correctamente");
      localStorage.removeItem("passwordReset");
    }
  }, []);

  const handleForgotPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/forgot-password",
        { email: recoveryEmail }
      );
      setMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setMessage(
          error.response.data.message ||
            "Error al enviar el correo de recuperación"
        );
      } else {
        setMessage("Error al enviar el correo de recuperación");
      }
    }
  };

  return (
    <Fragment>
      <main>
        <header className="login-header">
          <Link to="/register" className="login-header-back">
            <ArrowLogin />
            Crear una cuenta
          </Link>
        </header>
        <section className="login-main">
          <div className="login-main-title">
            <PodProseLogo />
            <h1>Inicia sesión</h1>
          </div>
          <div className="login-main-form">
            <div className="login-main-inputs">
              {showForgotPassword ? (
                <div className="forgot-password-form">
                  <div className="login-main-input-email">
                    <label htmlFor="recoveryEmail">Correo Electrónico</label>
                    <input
                      className="login-main-common-input"
                      title="Correo de recuperación"
                      type="email"
                      id="recoveryEmail"
                      name="recoveryEmail"
                      value={recoveryEmail}
                      onChange={(e) => setRecoveryEmail(e.target.value)}
                    />
                  </div>
                  <input
                    className="login-main-input-login"
                    title="Enviar"
                    type="button"
                    value="Enviar"
                    onClick={handleForgotPassword}
                  />
                  {message && <p className="message">{message}</p>}
                </div>
              ) : (
                <div className="login-main-inputs-wrapper">
                  <div className="login-main-input-email">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                      className="login-main-common-input"
                      title="Email"
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => updateEmail(e.target.value)}
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
                      onChange={(e) => updatePassword(e.target.value)}
                    />
                  </div>
                  <input
                    className="login-main-input-login"
                    title="Iniciar Sesión"
                    type="button"
                    value="Iniciar Sesión"
                    onClick={(e) => handleLogin(e)}
                  />
                </div>
              )}
            </div>
            <div className="login-main-separator">
              <p>o</p>
            </div>
            <div className="login-main-options">
              <div className="login-main-options-wrapper">
                <button
                  className="login-main-option-google"
                  onClick={googleLogin}
                >
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
            {showForgotPassword ? (
              <p
                className="login-main-footer-passwd"
                onClick={() => setShowForgotPassword(false)}
                style={{ cursor: "pointer" }}
              >
                Volver al inicio de sesión
              </p>
            ) : (
              <p
                className="login-main-footer-passwd"
                onClick={() => setShowForgotPassword(true)}
                style={{ cursor: "pointer" }}
              >
                ¿Olvidaste tu contraseña?
              </p>
            )}
            <p className="login-main-footer-terms">
              Inicio de Sesión Seguro con 2FA sujeto a los Términos y Privacidad
              de Google
            </p>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default LoginPage;
