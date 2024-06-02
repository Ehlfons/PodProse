import React, { useState, useEffect, createContext } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Contexto para los usuarios.
const UsersContext = createContext();

const UsersProvider = ({ children }) => {
  // Hook para redirigir a otras páginas.
  const navigate = useNavigate();
  const location = useLocation();

  // Valores iniciales.
  const userInitialValue = null;
  const emailInitialValue = "";
  const passwordInitialValue = "";
  const nameInitialValue = "";
  const usernameInitialValue = "";
  const tokenInitialvalue = null;
  const loggedInInitialValue = false;
  const errorsInitialValue = {};
  const isLoadingInitialValue = false;
  const editProfileFormInitialValue = {
    name: "",
    username: "",
    email: "",
  };
  const isEditingProfileInitialValue = false;
  const loadingLoggedInInitialValue = true;

  // Estados del contexto.
  const [user, setUser] = useState(userInitialValue);
  const [email, setEmail] = useState(emailInitialValue);
  const [password, setPassword] = useState(passwordInitialValue);
  const [name, setName] = useState(nameInitialValue);
  const [username, setUsername] = useState(usernameInitialValue);
  const [token, setToken] = useState(tokenInitialvalue);
  const [loggedIn, setLoggedIn] = useState(loggedInInitialValue);
  const [errors, setErrors] = useState(errorsInitialValue);
  const [isLoading, setIsLoading] = useState(isLoadingInitialValue);
  const [editProfileForm, setEditProfileForm] = useState(
    editProfileFormInitialValue
  );
  const [isEditingProfile, setIsEditingProfile] = useState(
    isEditingProfileInitialValue
  );
  const [loadingLoggedIn, setLoadingLoggedIn] = useState(
    loadingLoggedInInitialValue
  );

  // Variables
  const apiURL = import.meta.env.VITE_API_URL;

  // Función para iniciar sesión.
  const handleLogin = async (e) => {
    e.preventDefault();
    updateIsLoading(true);

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
          setUser(user);

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
      } finally {
        setTimeout(() => {
          updateIsLoading(false);
        }, 2000);
      }
    }
  };

  // Función para cerrar sesión.
  const handleLogout = () => {
    try {
      // Se eliminan los datos del usuario y el token del localStorage.
      localStorage.clear();

      setToken(tokenInitialvalue);
      setUser(userInitialValue);

      setLoggedIn(loggedInInitialValue);
      toast.success("Sesión cerrada exitosamente");

      // Redirigir a la página de login.
      navigate("/");
    } catch (error) {
      toast.error("Error al cerrar sesión");
    }
  };

  // Función para crear una cuenta de usuario.
  const handleRegister = async () => {
    try {
      const response = await axios.post(`${apiURL}/auth/register`, {
        name,
        email,
        password,
        username,
      });

      if (response.status === 201) {
        setName(nameInitialValue);
        setEmail(emailInitialValue);
        setPassword(passwordInitialValue);
        setUsername(usernameInitialValue);

        // Limpiar los errores.
        setErrors(errorsInitialValue);

        toast.success("Verifica tu correo para activar tu cuenta");
      } else {
        toast.error("Error al registrar el usuario");
      }
    } catch (error) {
      toast.error("Error al registrar el usuario");
    }
  };

  const getUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found");
    }

    try {
      const response = await axios.get(`${apiURL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status !== 200) {
        throw new Error("Error fetching user");
      }

      setUser(response.data);
      setEditProfileForm({
        name: response.data.name,
        username: response.data.username,
        email: response.data.email,
      });

      return response.data;
    } catch (error) {
      toast.error("Error al obtener el usuario");
      throw error;
    }
  };

  const handleImageUpload = async (file) => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${apiURL}/upload/user-image/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        setUser({ ...user, url_img: response.data.url_img });

        toast.success("Imagen de perfil actualizada");
      } else {
        toast.error("Error al subir la imagen");
      }
    } catch (error) {
      toast.error("Error de red");
    }
  };

  const patchUserData = async () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("User ID not found");
      return;
    }

    try {
      const response = await axios.patch(
        `${apiURL}/users/${userId}`,
        {
          name: editProfileForm.name,
          username: editProfileForm.username,
          email: editProfileForm.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        getUser();
        setIsEditingProfile(false);

        toast.success("Datos actualizados");
      } else {
        toast.error("Error al actualizar los datos");
      }
    } catch (error) {
      toast.error("Error de red");
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

  const readCookie = async () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (user && token) {
      setUser(user);
      setToken(token);
      await getUser();
      setLoggedIn(true);
    }
    setLoadingLoggedIn(false);
  };

  const updateEmail = (value) => setEmail(value);
  const updatePassword = (value) => setPassword(value);
  const updateName = (value) => setName(value);
  const updateUsername = (value) => setUsername(value);
  const updateLoggedIn = (value) => setLoggedIn(value);
  const updateToken = (value) => setToken(value);
  const updateErrors = (value) => setErrors(value);
  const updateIsLoading = (value) => setIsLoading(value);
  const updateIsEditingProfile = (value) => setIsEditingProfile(value);

  const updateEditProfileForm = (key, value) => {
    setEditProfileForm({
      ...editProfileForm,
      [key]: value,
    });
  };

  useEffect(() => {
    const fetchCheckLoggedInData = async () => {
      await readCookie();
    };

    fetchCheckLoggedInData();
  }, []);

  useEffect(() => {
    const isRegisterPage = location.pathname === "/register";
    const isVerificationEmailPage =
      location.pathname.startsWith("/auth/verify/");
    const isResetPage = location.pathname === "/reset-password";

    if (
      !loggedIn &&
      !loadingLoggedIn &&
      !isRegisterPage &&
      !isResetPage &&
      !isVerificationEmailPage
    ) {
      navigate("/");
    }
  }, [loggedIn, navigate, loadingLoggedIn, location.pathname]);

  const dataToExport = {
    email,
    password,
    name,
    username,
    user,
    token,
    loggedIn,
    errors,
    isLoading,
    editProfileForm,
    isEditingProfile,
    loadingLoggedIn,

    updateEmail,
    updatePassword,
    updateName,
    updateUsername,
    updateLoggedIn,
    updateToken,
    updateErrors,
    updateIsLoading,
    updateIsEditingProfile,
    updateEditProfileForm,

    handleLogin,
    handleLogout,
    handleRegister,
    handleImageUpload,
    patchUserData,
    getUser,
  };

  return (
    <UsersContext.Provider value={dataToExport}>
      {children}
    </UsersContext.Provider>
  );
};

export default UsersProvider;
export { UsersContext };
