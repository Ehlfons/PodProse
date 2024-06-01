import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:3000/auth/verify/${token}`);
        navigate("/login"); // Redirige al login después de la verificación
      } catch (error) {
        console.error("Error al verificar el correo electrónico:", error);
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div>
      <h1>Verificando tu correo electrónico...</h1>
    </div>
  );
};

export default VerifyEmailPage;
