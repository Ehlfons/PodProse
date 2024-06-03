import React from "react";
import { useUsers } from "@components/hooks";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const {
    handleResetPassword,
    isResetting,
    newPassword,
    message,
    setNewPassword,
  } = useUsers();

  return (
    <div className="reset-password-container">
      {isResetting ? (
        <div className="resetting-container">
          <div className="spinner"></div>
          <h1>Restableciendo contraseña...</h1>
        </div>
      ) : (
        <>
          <h1>Restablecer Contraseña</h1>
          <div className="reset-password-form">
            <label htmlFor="newPassword">Nueva Contraseña</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>
              Restablecer Contraseña
            </button>
            {message && <p className="message">{message}</p>}
          </div>
        </>
      )}
    </div>
  );
};

export default ResetPasswordPage;
