import React, { useState, useEffect, createContext } from "react";
import { toast } from "sonner";
import axios from "axios";

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

  const userInitialValue = null;
  const emailInitialValue = "";
  const passwordInitialValue = "";
  const userDataInitialValue = null;
  const tokenInitialvalue = null;
  const loggedInInitialValue = false;
  const errorsInitialValue = {};

  // Estados del contexto.
  const [infoSesion, setInfoSesion] = useState(datosSesionInicial);
  const [usuario, setUsuario] = useState(usuarioInicial);
  const [errorUsuario, setErrorUsuario] = useState(errorUsuarioInicial);
  const [sesionIniciada, setSesionIniciada] = useState(sesionInicial);
  const [confirmacionInicioSesion, setConfirmacionInicioSesion] = useState(confirmacionInicioSesionInicial);

  const [user, setUser] = useState(userInitialValue);
  const [email, setEmail] = useState(emailInitialValue);
  const [password, setPassword] = useState(passwordInitialValue);
  const [userData, setUserData] = useState(userDataInitialValue);
  const [token, setToken] = useState(tokenInitialvalue);
  const [loggedIn, setLoggedIn] = useState(loggedInInitialValue);
  const [errors, setErrors] = useState(errorsInitialValue);

  // Variables
  const apiURL = import.meta.env.VITE_API_URL;
  // const userId = localStorage.getItem("id");

  // Funciones

  const handleLogin = async (e) => {
    e.preventDefault();

    const isValidForm = validateLoginForm();

    if (isValidForm) {
      try {
        const response = await axios.post(`${apiURL}/auth/login`, {
          email,
          password,
        });

        if (response.status === 201) {
          const { user, access_token } = response.data;

          localStorage.setItem("token", access_token);
          localStorage.setItem("id", user.id);
          localStorage.setItem("user", user.role);

          setToken(token);
          setUserData(user);

          setLoggedIn(true);

          toast.success("Inicio de sesión exitoso");

          // Limpiar el formulario.
          setEmail(emailInitialValue);
          setPassword(passwordInitialValue);

          // Limpiar los errores.
          setErrors(errorsInitialValue);
        }

        if (response.status === 203) {
          toast.error("Demasiados intentos. Inténtelo de nuevo más tarde");
        }
      } catch (error) {
        toast.error("Correo electrónico o contraseña incorrectos");
      }
    }
  };

  // Función para cerrar sesión.
  const handleLogout = () => {
    try {
      // Se eliminan los datos del usuario y el token del localStorage.
      localStorage.removeItem("token");
      localStorage.removeItem("id");
      localStorage.removeItem("user");
      localStorage.removeItem("companyId");

      setToken(tokenInitialvalue);
      setUserData(userDataInitialValue);

      setLoggedIn(loggedInInitialValue);

      // Redirigir a la página de login.
      navigate("/");
      location.reload();

      toast.success("Cierre de sesión exitoso");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  // Función para validar el formulario de inicio de sesión.
  const validateLoginForm = () => {
    const errors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (!emailPattern.test(email)) {
      errors.email = "Formato de correo electrónico inválido";
    }

    // if (!passwordPattern.test(password)) {
    //   errores.password =
    //     "La contraseña debe tener al menos 8 caracteres, incluyendo al menos una letra mayúscula, una letra minúscula y un número.";
    // }

    setErrors(errors);

    // Devolver true si no hay errores
    return Object.keys(errors).length === 0;
  };

  const readCookie = () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user && token) {
      setLoggedIn(true);
      setUserData(user);
      setToken(token);
    }
  };

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

  /* // Función para iniciar sesión.
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
      navigate("/");
    } catch (error) {
      setErrorUsuario("Error al cerrar sesión:" + error.message);
    }
  }; */

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

  /* useEffect(() => {
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
  }, []); */

  const updateEmail = (value) => setEmail(value);
  const updatePassword = (value) => setPassword(value);
  const updateLoggedIn = (value) => setLoggedIn(value);
  const updateUserData = (value) => setUserData(value);
  const updateToken = (value) => setToken(value);
  const updateErrors = (value) => setErrors(value);

  useEffect(() => {
    readCookie();
  }, []);

  const datosAExportar = {
    email,
    password,
    user,
    userData,
    token,
    loggedIn,
    errors,

    updateEmail,
    updatePassword,
    updateLoggedIn,
    updateUserData,
    updateToken,
    updateErrors,

    handleLogin,
    handleLogout,

    sesionIniciada,
    errorUsuario,
    registro,
    /* iniciarSesion,
    cerrarSesion, */
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