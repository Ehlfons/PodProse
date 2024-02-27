import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import useUsuarios from "../../../hooks/useUsuarios.jsx";
import "./Login.css";

const Login = () => {
  // Importar el estado y las funciones del contexto de usuarios.
  const { sesionIniciada, cerrarSesion, confirmacionInicioSesion } = useUsuarios();

  const navigate = useNavigate();
  return (
    <Fragment>
      {confirmacionInicioSesion && <div className="check">&#10003; Se ha iniciado sesión correctamente &#10003;</div>}

      <div className="login-button">
        <a
          onClick={() => {
            sesionIniciada ? cerrarSesion() : navigate("/login"); // Si la sesión está iniciada, se cierra. Si no, se redirige a la página de inicio de sesión.
          }}
        >
          {sesionIniciada ? "Cerrar Sesión" : "Login"} {/* Si la sesión está iniciada, se muestra "Cerrar Sesión". Si no, se muestra "Login".*/}
        </a>
      </div>
    </Fragment>
  );
};

export default Login;
