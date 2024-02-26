import { Fragment } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProveedorUsuarios from "./contexts/ProveedorUsuarios.jsx";
import "./App.css";

function App() {
/*   const location = useLocation();

  const isLoginPage = location.pathname === "/login"; */
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          {/* {!isLoginPage && <Header />} */}
          <Header />
          <Main />
          <Footer />
          {/* {!isLoginPage && <Footer />} */}
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
