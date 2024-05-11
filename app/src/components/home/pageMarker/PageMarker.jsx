import { Fragment } from "react";
import "./PageMarker.css";

const PageMarker = () => {
  return (
    <Fragment>
      <div className="page-markers">
        <img
          className="marker"
          src="src/assets/Page-Marker.svg"
          alt="Page Marker"
        />
        <img
          className="marker"
          src="src/assets/Page-Marker.svg"
          alt="Page Marker"
        />
        <img
          className="marker selected"
          src="src/assets/Page-Marker.svg"
          alt="Page Marker"
        />
      </div>
    </Fragment>
  );
};

export default PageMarker;
