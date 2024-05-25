import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUsers, usePodcasts } from "@components/hooks";
import { DefaultUserProfile, PlusIcon } from "@components/svg";
import "./Login.css";

const Login = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { loggedIn } = useUsers();

  const { actualizarAudioUrl } = usePodcasts();

  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="login-button">
        <div>
          <a
            onClick={() => {
              navigate("/my-content");
            }}
          >
          <PlusIcon />

          </a>
          {loggedIn && (
            <Link
              to="/profile"
              className="userProfile"
              onClick={() => {
                actualizarAudioUrl("");
                
              }}
            >
              <DefaultUserProfile />
            </Link>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
