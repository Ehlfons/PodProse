import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { useUsers } from "@components/hooks";
import Loader from "@components/loader/Loader";

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const { isLoading, updateIsLoading } = useUsers();

  const handleResetPassword = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/auth/reset-password",
        { token, newPassword }
      );
      setMessage(response.data.message);
      localStorage.setItem("passwordReset", "true"); // Guardar en localStorage
      updateIsLoading(true);
      setTimeout(() => {
        updateIsLoading(false);
        navigate("/login"); // Redirigir al login después de unos segundos
      }, 2000); // Espera 2 segundos antes de redirigir
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

      {isLoading && <Loader />}
    </div>
  );
};

export default ResetPasswordPage;
