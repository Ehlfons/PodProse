import { Fragment } from "react";
import HexagonLayout from "./Home-Content/HexagonLayout.jsx";
import MainText from "./Home-Content/MainText.jsx";
import PageMarker from "./Home-Content/PageMarker.jsx";
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
