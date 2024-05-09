import { useContext } from "react";
import { ContextoPodcasts } from "@contexts/ProveedorPodcasts.jsx";

// Hook para usar el contexto de Podcasts.
const usePodcasts = () => {
  const contexto = useContext(ContextoPodcasts);
  return contexto;
};

export default usePodcasts;