import { Fragment } from "react";
import PodProseLogo from "../../svg/PodProseLogo.jsx";
import "./Logo.css";

const Logo = () => {
  return (
    <Fragment>
      <figure className="container-logo-svg">
        <PodProseLogo />
      </figure>
    </Fragment>
  );
};

export default Logo;
