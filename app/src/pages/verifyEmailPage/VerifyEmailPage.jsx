import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUsers } from "@components/hooks";
import "./VerifyEmailPage.css";

const VerifyEmailPage = () => {
  const { token } = useParams();
  const { verifyEmail } = useUsers();

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token, verifyEmail]);

  return (
    <div className="verify-email-container">
      <div className="spinner"></div>
      <h1>Verificando tu correo electrónico...</h1>
    </div>
  );
};

export default VerifyEmailPage;
