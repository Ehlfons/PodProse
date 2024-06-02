import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const verifyEmail = async () => {
      try {
        await axios.get(`http://localhost:3000/auth/verify/${token}`);
        if (isMounted && !isVerified) {
          localStorage.setItem("emailVerified", "true"); // Guardar en localStorage
          setIsVerified(true);
          setTimeout(() => {
            navigate("/"); // Redirigir al login después de unos segundos
          }, 2000); // Espera 2 segundos antes de redirigir
        }
      } catch (error) {
        if (isMounted && !isVerified) {
          toast.error("Error al verificar el correo electrónico");
          setIsVerified(true);
        }
        console.error("Error al verificar el correo electrónico:", error);
      }
    };

    verifyEmail();

    return () => {
      isMounted = false;
    };
  }, [token, navigate, isVerified]);

  return (
    <div>
      <h1>Verificando tu correo electrónico...</h1>
    </div>
  );
};

export default VerifyEmailPage;
