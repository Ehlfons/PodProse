import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import "./VerifyEmailPage.css"; // Importar el archivo CSS

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
          localStorage.setItem("emailVerified", "true");
          setIsVerified(true);
          setTimeout(() => {
            navigate("/login");
          }, 2000);
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
    <div className="verify-email-container">
      <h1>Verificando tu correo electrónico...</h1>
      <div className="spinner"></div>
    </div>
  );
};

export default VerifyEmailPage;
