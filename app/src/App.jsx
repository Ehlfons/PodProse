import { Fragment } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { Header } from "@components/Header";
import Footer from "@components/Footer/Footer";
import Routes from "@components/routes/Routes";
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
              <Routes />
              <Toaster richColors />
            </main>
            <Footer />
          </ProveedorPodcasts>
        </ProveedorUsuarios>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
