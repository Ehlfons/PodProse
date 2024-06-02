import { useLocation } from "react-router-dom";
import Footer from "./Footer";

const FooterWrapper = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  if (isLoginPage || isRegisterPage) {
    return null;
  }

  return <Footer />;
};

export default FooterWrapper;