import { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Main from "./components/Main/Main.jsx";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "./App.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
