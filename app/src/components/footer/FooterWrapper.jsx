import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const FooterWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";
  const isVerifyEmailPage = /^\/auth\/verify\/[^/]+$/.test(location.pathname);
  const isResetPasswordPage = location.pathname === "/reset-password" && new URLSearchParams(location.search).has("token");
  const isTermsAndConditionsPage = location.pathname === "/terms-and-conditions";
  const isPrivacyPoliciesPage = location.pathname === "/privacy-policies";

  if (
    isLoginPage ||
    isRegisterPage ||
    isVerifyEmailPage ||
    isResetPasswordPage ||
    isTermsAndConditionsPage ||
    isPrivacyPoliciesPage
  ) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;
