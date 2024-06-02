import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        { token, newPassword }
      );
      toast.success("Contraseña restablecida correctamente");
      setMessage(response.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      toast.error("Error al restablecer la contraseña");
      setMessage(
        error.response.data.message || "Error al restablecer la contraseña"
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
