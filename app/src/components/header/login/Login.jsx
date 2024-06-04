import { Fragment } from "react";
import { Link } from "react-router-dom";

import { useUsers } from "@components/hooks";
import { DefaultUserProfile, PlusIcon } from "@components/svg";
import "./Login.css";

const Login = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { loggedIn, updateIsLoading } = useUsers();

  const handleClick = () => {
    updateIsLoading(true);

    setTimeout(() => {
      updateIsLoading(false);
    }, 1500);
  }

  return (
    <Fragment>
      <div className="login-button icon-hide-small">
        <div>
          <Link onClick={() => handleClick()} to="/my-content">
            <PlusIcon />
          </Link>
          {loggedIn && (
            <Link onClick={() => handleClick()} to="/profile" className="userProfile">
              <DefaultUserProfile />
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
