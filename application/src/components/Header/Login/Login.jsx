import { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  return (
    <Fragment>
      <div className="login-button">
        <Link to="/login">Login</Link>
      </div>
    </Fragment>
  );
};

export default Login;
