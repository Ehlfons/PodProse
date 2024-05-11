import { Fragment } from "react";
import { Link } from "react-router-dom";

import { PodProseLogo } from "@components/svg";
import "./Logo.css";

const Logo = () => {
  return (
    <Fragment>
      <figure className="container-logo-svg">
        <Link to="/">
          <PodProseLogo />
        </Link>
      </figure>
    </Fragment>
  );
};

export default Logo;
