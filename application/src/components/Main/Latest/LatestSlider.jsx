import { Fragment } from "react";
import json from "../../../objects/podcasts.json";
import "./LatestSlider.css";

const LatestSlider = () => {
  /**
   * Obtiene un número aleatorio de podcasts del objeto JSON.
   * @param {Object} json - El objeto JSON que contiene los podcasts.
   * @param {number} numeroPodcasts - El número de podcasts aleatorios a obtener.
   * @returns {Array} - Un array de objetos con la imagen, nombre, categoría y enlace correspondiente.
   */
  const getRandomPodcasts = (json, numeroPodcasts) => {
    // Filtra los podcasts que tienen la propiedad "upload_date"
    const podcastsWithUploadDate = Object.values(json).filter(
      (podcast) => podcast.upload_date
    );

    // Ordena los podcasts por fecha de subida de forma descendente
    const sortedPodcasts = podcastsWithUploadDate.sort(
      (a, b) => new Date(b.upload_date) - new Date(a.upload_date)
    );

    // Selecciona los 12 podcasts más recientes
    const latestPodcasts = sortedPodcasts.slice(0, 12);

    // Obtiene un número aleatorio de los podcasts seleccionados
    const randomPodcasts = [];
    
    while (randomPodcasts.length < numeroPodcasts) {
      const randomIndex = Math.floor(Math.random() * latestPodcasts.length);
      const randomPodcast = latestPodcasts[randomIndex];
      if (!randomPodcasts.includes(randomPodcast)) {
        randomPodcasts.push(randomPodcast);
      }
    }

    // Devuelve un array de objetos con la imagen, nombre, categoría y enlace correspondiente.
    return randomPodcasts.map((podcast) => ({
      image: podcast.image,
      name: podcast.name,
      category: podcast.category,
      link: `creador/${podcast.uuid}`, // La URL es pagina creador/id del podcast
    }));
  };

  const randomPodcasts = getRandomPodcasts(json, 3);

  return (
    <Fragment>
      <div className="latest-slider-wrapper">
        {randomPodcasts.map((podcast, index) => (
          <div key={index}>
            <a href={podcast.link}>
              <div className="latest-slider-fade">
                <div className="latest-info-img">
                  <h5>{podcast.name}</h5>
                  <p>{podcast.category}</p>
                </div>
                <img
                  className="latest-slider-img"
                  src={podcast.image}
                  alt={`Image ${index + 1}`}
                  onClick={() => {
                    window.location.href = podcast.link; // Redirige a la página del podcast. cambiar por un navigate cuando esté bien hecho y la pagina de podcast funcione.
                  }}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default LatestSlider;
