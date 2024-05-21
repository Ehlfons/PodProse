import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alert from "react-bootstrap/Alert"; // Cambiar por sonner alert

import { useUsers, usePodcasts } from "@components/hooks";
import { LogoutIcon, DefaultUserProfile } from "@components/svg";
import "./Login.css";

const Login = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const {
    loggedIn,
    handleLogout,
  } = useUsers();

  const { actualizarAudioUrl } = usePodcasts();

  const navigate = useNavigate();
  return (
    <Fragment>
      <div className="login-button">
        <div>
          <a
            onClick={() => {
              if (loggedIn) {
                handleLogout();
              } else {
                navigate("/");
              }
            }}
          >
            {loggedIn ? <LogoutIcon /> : "Login"}{" "}
            {/* Si la sesión está iniciada, se muestra el icono de cerrar sesión. Si no, se muestra "Login".*/}
          </a>
          {loggedIn && (
            <Link
              to="/creator"
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
