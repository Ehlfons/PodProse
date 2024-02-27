import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ProveedorUsuarios from "./contexts/ProveedorUsuarios.jsx";
import "./App.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <Header />
          <Main />
          <Footer />
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
