import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useUsers } from "@components/hooks";
import "./ResetPasswordPage.css";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isResetting, setIsResetting] = useState(false);
  const navigate = useNavigate();

  const { updateIsLoading } = useUsers();

  const handleResetPassword = async () => {
    setIsResetting(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        { token, newPassword }
      );
      setMessage(response.data.message);
      localStorage.setItem("passwordReset", "true");
      updateIsLoading(true);
      setTimeout(() => {
        updateIsLoading(false);
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Error al restablecer la contraseña");
      setMessage(
        error.response.data.message || "Error al restablecer la contraseña"
      );
      setIsResetting(false);
    }
  };

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
