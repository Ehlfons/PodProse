import { Fragment } from "react";
import PodProseLogo from "@components/svg/PodProseLogo.jsx";
import { Link } from "react-router-dom";
import "./Logo.css";

const Logo = () => {
  return (
    <Fragment>
      <figure className="container-logo-svg">
        <Link to="/"><PodProseLogo /></Link>
      </figure>
    </Fragment>
  );
};

export default Logo;
