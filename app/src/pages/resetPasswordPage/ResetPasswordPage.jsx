import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        { token, newPassword }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error al restablecer la contraseña"
      );
    }
  };

  return (
    <div className="reset-password-container">
      <h1>Restablecer Contraseña</h1>
      <div className="reset-password-form">
        <label htmlFor="newPassword">Nueva Contraseña</label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleResetPassword}>Restablecer Contraseña</button>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
