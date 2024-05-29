import { useContext } from "react";
import { UsersContext } from "@contexts/UsersProvider.jsx";

// Hook para usar el contexto de Users.
const useUsers = () => {
  const context = useContext(UsersContext);
  return context;
};

export default useUsers;