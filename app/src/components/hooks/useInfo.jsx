import { useContext } from "react";
import { InfoContext } from "@contexts/InfoProvider.jsx";

// Hook para usar el contexto de Info.
const useInfo = () => {
  const context = useContext(InfoContext);
  return context;
};

export default useInfo