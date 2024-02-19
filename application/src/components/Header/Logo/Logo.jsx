import { Fragment } from "react";
import "./Logo.css";

const Logo = () => {
  return (
    <Fragment>
      <figure className="container-logo-img">
        <img className="logo-img" src="src/assets/PodProse_Logo_Green.svg" alt="PodProse Logo" />
      </figure>
    </Fragment>
  );
};

export default Logo;
