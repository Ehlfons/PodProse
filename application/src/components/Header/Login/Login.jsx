import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUsuarios from "../../../hooks/useUsuarios.jsx";
import usePodcasts from "../../../hooks/usePodcasts.jsx";
import DefaultUserProfile from "../../svg/DefaultUserProfile.jsx";
import LogoutIcon from "../../svg/LogoutIcon.jsx";
import Alert from "react-bootstrap/Alert";
import "./Login.css";

const Login = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const {
    sesionIniciada,
    cerrarSesion,
    confirmacionInicioSesion,
    actualizarErrorUsuario,
  } = useUsuarios();

  const { actualizarAudioUrl } = usePodcasts();

  const navigate = useNavigate();
  return (
    <Fragment>
      {confirmacionInicioSesion && (
        <Alert variant="success" className="check">
          {" "}
          {/* Estilo básico manual ya que no funciona el success de react-bootstrap */}
          Se ha iniciado sesión correctamente
        </Alert>
      )}

      <div className="login-button">
        <div>
          <a
            onClick={() => {
              if (sesionIniciada) {
                cerrarSesion();
              } else {
                navigate("/login");
                actualizarErrorUsuario("");
              }
            }}
          >
            {sesionIniciada ? <LogoutIcon /> : "Login"}{" "}
            {/* Si la sesión está iniciada, se muestra el icono de cerrar sesión. Si no, se muestra "Login".*/}
          </a>
          {sesionIniciada && (
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
