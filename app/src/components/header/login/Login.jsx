import { Fragment } from "react";
import { Link } from "react-router-dom";

import { useUsers } from "@components/hooks";
import { DefaultUserProfile, PlusIcon } from "@components/svg";
import "./Login.css";

const Login = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { loggedIn, updateIsLoading } = useUsers();

  return (
    <Fragment>
      <div className="login-button icon-hide-small">
        <div>
          <Link onClick={() => updateIsLoading(true)} to="/my-content">
            <PlusIcon />
          </Link>
          {loggedIn && (
            <Link onClick={() => updateIsLoading(true)} to="/profile" className="userProfile">
              <DefaultUserProfile />
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
