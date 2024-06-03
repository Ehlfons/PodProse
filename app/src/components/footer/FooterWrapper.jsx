import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const FooterWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isVerifyEmailPage = /^\/auth\/verify\/[^/]+$/.test(location.pathname);
  const isResetPasswordPage =
    location.pathname === "/reset-password" &&
    new URLSearchParams(location.search).has("token");

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
