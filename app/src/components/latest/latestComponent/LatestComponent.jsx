import { Fragment } from "react";
import { LatestSlider, LatestSliderMarker } from "@components/latest";
import "./LatestComponent.css";

const LatestComponent = () => {
  return (
    <Fragment>
      <section className="container-latest">
        <div className="latest-wrapper">
          <div className="container-latest-title">
            <h2 className="latest-title">Últimos Podcasts</h2>
            <hr className="latest-title-greenLine" />
          </div>
          <LatestSlider />
          <LatestSliderMarker />
        </div>
      </section>
    </Fragment>
  );
};

export default LatestComponent;
