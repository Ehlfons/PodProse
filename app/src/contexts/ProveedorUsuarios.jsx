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
  const nameInitialValue = "";
  const usernameInitialValue = "";
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
  const [name, setName] = useState(nameInitialValue);
  const [username, setUsername] = useState(usernameInitialValue);
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

          // Redirigir a la página de inicio.
          navigate("/home");
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
      toast.success("Sesión cerrada exitosamente");

      // Redirigir a la página de login.
      navigate("/");

    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  // Función para crear una cuenta de usuario.
  const handleRegister = async (e) => {
    try {
      // Se crea la cuenta en el servidor de Supabase.
      const response = await axios.post(`${apiURL}/auth/register`, {
        name,
        email,
        password,
        username,
      });

      if (response.status === 201) {
        const promise = () => new Promise((resolve) => setTimeout(() => {
          setName(nameInitialValue);
          setEmail(emailInitialValue);
          setPassword(passwordInitialValue);
          setUsername(usernameInitialValue);
  
          // Limpiar los errores.
          setErrors(errorsInitialValue);
          handleLogin(e);
          resolve({})
        }, 2000));
  
        toast.promise(promise, {
          loading: 'Loading...',
          success: () => {
            return `Cuenta creada exitosamente`;
          },
          error: 'Error',
        });
      }
    } catch (error) {
      toast.error("Correo electrónico o contraseña incorrectos");
    }
  };

  const googleLogin = async () => {
    try {
      window.open(`http://localhost:3001/auth/google-logins/${from.replaceAll('/', '@')}`, "_self");
    } catch (ex) {
      console.log(ex)
    }
  }

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

  const updateEmail = (value) => setEmail(value);
  const updatePassword = (value) => setPassword(value);
  const updateName = (value) => setName(value);
  const updateUsername = (value) => setUsername(value);
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
    name,
    username,
    user,
    userData,
    token,
    loggedIn,
    errors,

    updateEmail,
    updatePassword,
    updateName,
    updateUsername,
    updateLoggedIn,
    updateUserData,
    updateToken,
    updateErrors,

    handleLogin,
    handleLogout,
    handleRegister,

    sesionIniciada,
    errorUsuario,
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