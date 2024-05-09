import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "@components/main/Main.jsx"
import Header from "@components/header/Header.jsx";
import Footer from "@components/footer/Footer.jsx";
import ProveedorUsuarios from "@contexts/ProveedorUsuarios.jsx";
import ProveedorPodcasts from "@contexts/ProveedorPodcasts.jsx";
import "./App.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <ProveedorPodcasts>
            <Header />
            <Main />
            <Footer />
          </ProveedorPodcasts>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
