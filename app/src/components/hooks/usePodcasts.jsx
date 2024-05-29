import { useContext } from "react";
import { PodcastsContext } from "@contexts/PodcastsProvider.jsx";

// Hook para usar el contexto de Podcasts.
const usePodcasts = () => {
  const context = useContext(PodcastsContext);
  return context;
};

export default usePodcasts;