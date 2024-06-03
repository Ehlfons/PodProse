import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const FooterWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isVerifyEmailPage = /^\/auth\/verify\/[^/]+$/.test(location.pathname); // Check if the path matches /auth/verify/${token}
  const isResetPasswordPage = location.pathname === "/auth/reset-password";

  if (
    isLoginPage ||
    isRegisterPage ||
    isVerifyEmailPage ||
    isResetPasswordPage
  ) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;
