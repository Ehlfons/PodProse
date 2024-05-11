import { Fragment } from "react";
import { HexagonLayout, MainText, PageMarker } from "@components/home";
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
