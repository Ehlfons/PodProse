import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:3000/auth/verify/${token}`);
        localStorage.setItem("emailVerified", "true");
        toast.success("Correo verificado correctamente");
        navigate("/"); // Redirige al login después de la verificación
      } catch (error) {
        toast.error("Error al verificar el correo electrónico");
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
