import React, { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import { useNavigate } from "react-router-dom";

// Contexto para los usuarios.
const ContextoUsuarios = createContext();

const ProveedorUsuarios = ({ children }) => {

  // Hook para redirigir a otras páginas.
  const navigate = useNavigate();

  // Valores iniciales.
  const sesionInicial = false;
  const usuarioInicial = {};
  const errorUsuarioInicial = "";
  const confirmacionInicioSesionInicial = false;
  const datosSesionInicial = {
    email: "",
    password: "",
  };

  // Estados del contexto.
  const [infoSesion, setInfoSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);
  const [confirmacionInicioSesion, setConfirmacionInicioSesion] = useState(confirmacionInicioSesionInicial);

  // Función para crear una cuenta de usuario.
  const registro = async () => {
    try {
      // Se crea la cuenta en el servidor de Supabase.
      const { error } = await supabaseConexion.auth.signUp({
        email: infoSesion.email,
        password: infoSesion.password,
      });

      // Si hay un error, se lanza una excepción.
      if (error) {
        throw error;
      } else { // Si no hay error, se muestra un mensaje al usuario.
        setErrorUsuario(
          "Recibirás un correo para la confirmación del registro."
        );

        resetInputs(); // Se resetean los inputs del formulario.
      }
    } catch (error) {
      setErrorUsuario("Error al crear la cuenta: " + error.message);
    }
  };

  // Función para iniciar sesión.
  const iniciarSesion = async () => {
    setErrorUsuario(errorUsuarioInicial); // Se resetea el error del formulario de inicio de sesión.
    try {
      // Se inicia sesión en el servidor de Supabase.
      const { error } = await supabaseConexion.auth.signInWithPassword({
        email: infoSesion.email,
        password: infoSesion.password,
      });
      if (error) {
        throw error;
      }

      confirmInicioSesion(); // Se muestra un mensaje al usuario.
      resetInputs(); // Se resetean los inputs del formulario.

    } catch (error) {
      setErrorUsuario("Error al iniciar sesión: " + error.message);
    }
  };

  // Función para cerrar la sesión de usuario.
  const cerrarSesion = async () => {
    try {
      // Se cierra la sesión en el servidor de Supabase.
      await supabaseConexion.auth.signOut();
      // Se redirige la aplicación a la parte pública (<usuario anon>).
      setSesionIniciada(false);
    } catch (error) {
      setErrorUsuario("Error al cerrar sesión:" + error.message);
    }
  };

  // Función para obtener los datos del usuario.
  const obtenerUsuario = async () => {
    try {
      // Se obtiene la información del usuario que tiene sesión iniciada.
      const { data, error } = await supabaseConexion.auth.getUser();

      if (error) {
        throw error;
      }
      // Se actualiza el estado del usuario.
      setUsuario(data.user);

    } catch (error) {
      setErrorUsuario("Error al obtener el usuario:" + error.message);
    }
  };

  // Función para actualizar los datos de sesión del usuario.
  const actualizarDato = (e) => {
    const { name, value } = e.target;
    setInfoSesion({ ...infoSesion, [name]: value });
  };

  // Función para mostrar al usuario que se ha iniciado sesión.
  const confirmInicioSesion = () => {
    setConfirmacionInicioSesion(true);
    setTimeout(() => {
      setConfirmacionInicioSesion(false);
    }, 3000);
  };

  // Función para actualizar el error del usuario.
  const actualizarErrorUsuario = (nuevoValor) => {
    setErrorUsuario(nuevoValor);
  }

  // Función para resetear los inputs.
  const resetInputs = () => {
    setInfoSesion(datosSesionInicial);
  }

  useEffect(() => {
    const suscripcion = supabaseConexion.auth.onAuthStateChange(
      (e, session) => {
       if (session) {
          setSesionIniciada(true); // Cambia el estado de la sesión a iniciada.
          obtenerUsuario(); // Obtiene los datos del usuario.
        } else {
          setSesionIniciada(false); // Cambia el estado de la sesión a no iniciada.
        }
      }
    );
  }, []);

  const datosAExportar = {
    sesionIniciada,
    errorUsuario,
    registro,
    iniciarSesion,
    cerrarSesion,
    actualizarDato,
    actualizarErrorUsuario,
    usuario,
    confirmacionInicioSesion,
    infoSesion,
    confirmInicioSesion,  
    resetInputs  
  };

  return (
    <ContextoUsuarios.Provider value={datosAExportar}>
      {children}
    </ContextoUsuarios.Provider>
  );
};

export default ProveedorUsuarios;
export { ContextoUsuarios };