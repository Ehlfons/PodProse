import { Fragment } from "react";
import "./LatestSliderMarker.css";

const LatestSliderMarker = () => {
  return (
    <Fragment>
      <div className="container-slider-markers">
        <svg className="latest-slider-marker selected">
          <rect width="50" height="5" rx="2.5" fill="#B0E444" />
        </svg>
        <svg className="latest-slider-marker">
          <rect width="50" height="5" rx="2.5" fill="#B0E444" />
        </svg>
        <svg className="latest-slider-marker">
          <rect width="50" height="5" rx="2.5" fill="#B0E444" />
        </svg>
      </div>
    </Fragment>
  );
};

export default LatestSliderMarker;
