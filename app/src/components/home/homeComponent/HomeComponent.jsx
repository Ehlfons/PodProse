import { Fragment } from "react";
import HexagonLayout from "../hexagonLayout/HexagonLayout.jsx";
import MainText from "../mainText/MainText.jsx";
import PageMarker from "../pageMarker/PageMarker.jsx";
import "./HomeComponent.css";

const HomeComponent = () => {
  return (
    <Fragment>
      <section className="home-container">
        <div className="home-container-HexagonLayout">
          <HexagonLayout />
          <PageMarker />
        </div>
        <MainText />
      </section>
    </Fragment>
  );
};

export default HomeComponent;
