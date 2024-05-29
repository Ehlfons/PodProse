import { useState, createContext } from "react";
import { toast } from "sonner";
import axios from "axios";

// Contexto para las listas.
const InfoContext = createContext();

const InfoProvider = ({ children }) => {
  // Valores iniciales.
  const emailFormDataInitialValue = {
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  };

  // Estados.
  const [emailFormData, setEmailFormData] = useState(emailFormDataInitialValue);

  // Variables.
  const apiURL = import.meta.env.VITE_API_URL;

  // Funciones.

  const handleSubmitContactEmail = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${apiURL}/contact`, emailFormData);

      toast.success("Correo enviado correctamente");
      setEmailFormData({
        fullName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error al enviar el correo electrónico");
    }
  };

  const handleChangeEmailFormData = (e) => {
    setEmailFormData({ ...emailFormData, [e.target.name]: e.target.value });
  };

  // Datos a exportar al contexto.
  const dataToExport = {
    emailFormData,
    handleChangeEmailFormData,
    handleSubmitContactEmail,
  };

  return (
    <InfoContext.Provider value={dataToExport}>
      {children}
    </InfoContext.Provider>
  );
};

export default InfoProvider;
export { InfoContext };