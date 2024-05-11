import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header } from "@components/header";
import Footer from "@components/footer/Footer";
import Rutas from "@components/rutas/Rutas.jsx";
// import ProveedorUsuarios from "@contexts/ProveedorUsuarios";
// import ProveedorPodcasts from "@contexts/ProveedorPodcasts";
import { ProveedorUsuarios, ProveedorPodcasts } from "@contexts/index";
import "./App.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <ProveedorUsuarios>
          <ProveedorPodcasts>
            <Header />
            <main>
              <Rutas />
            </main>
            <Footer />
          </ProveedorPodcasts>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
