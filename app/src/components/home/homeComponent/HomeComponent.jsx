import { Fragment } from "react";
import { HexagonLayout, MainText } from "@components/home";
import "./HomeComponent.css";

const HomeComponent = () => {
  return (
    <Fragment>
      <section className="home-container">
        <div className="home-container-HexagonLayout">
          <HexagonLayout />
        </div>
        <MainText />
      </section>
    </Fragment>
  );
};

export default HomeComponent;
