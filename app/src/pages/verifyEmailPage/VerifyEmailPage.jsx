import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    console.log("VerifyEmailPage mounted");
    let isMounted = true;

    const verifyEmail = async () => {
      try {
        console.log("Verifying email with token:", token);
        await axios.get(`http://localhost:3000/auth/verify/${token}`);
        if (isMounted && !isVerified) {
          toast.success("Correo verificado correctamente");
          setIsVerified(true);
          navigate("/");
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
      console.log("VerifyEmailPage unmounted");
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
