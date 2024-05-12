import { useContext } from "react";
import { ContextoUsuarios } from "@contexts/ProveedorUsuarios.jsx";

// Hook para usar el contexto de Users.
const useUsers = () => {
  const contexto = useContext(ContextoUsuarios);
  return contexto;
};

export default useUsers;