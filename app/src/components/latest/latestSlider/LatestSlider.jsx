import { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { usePodcasts } from "@components/hooks";
import { Loader } from "@components/loader";

import "swiper/css";
import "swiper/css/pagination";

import "./LatestSlider.css";

const LatestSlider = () => {
  const { podcastsList } = usePodcasts();
  const { updateAudioUrl, updateSelectedPodcast, updateVisibility } = usePodcasts();

  const [randomPodcasts, setRandomPodcasts] = useState([]);
  const [slidesPerViewNumber, setSlidesPerViewNumber] = useState(3);

  useEffect(() => {
    if (podcastsList.length > 0) {
      setRandomPodcasts(getRandomPodcasts(podcastsList, 7));
    }
  }, [podcastsList]);
  
  const handleResize = () => {
    if (window.innerWidth <= 805) {
      setSlidesPerViewNumber(1);
    } else if (window.innerWidth <= 1254) {
      setSlidesPerViewNumber(2);
    } else {  
      setSlidesPerViewNumber(3);
    }
  };
  
  useEffect(() => {
    
    // Llama la función al montar el componente para ajustar el estado inicial
    handleResize();
    
    // Añade un listener para el evento resize
    window.addEventListener('resize', handleResize);
    
    // Limpia el listener al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  /**
   * Obtiene un número aleatorio de podcasts del estado.
   * @param {Array} podcasts - El array de podcasts.
   * @param {number} numeroPodcasts - El número de podcasts aleatorios a obtener.
   * @returns {Array} - Un array de objetos con la imagen, nombre, categoría y enlace correspondiente.
   */
  const getRandomPodcasts = (podcasts, numeroPodcasts) => {
    // Filtra los podcasts que tienen la propiedad "createdAt"
    const podcastsWithUploadDate = podcasts.filter(
      (podcast) => podcast.createdAt
    );

    // Ordena los podcasts por fecha de subida de forma descendente
    const sortedPodcasts = podcastsWithUploadDate.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    // Selecciona los 20 podcasts más recientes
    const latestPodcasts = sortedPodcasts.slice(0, 20);

    // Obtiene un número aleatorio de los podcasts seleccionados
    const randomPodcasts = [];
    const usedIndexes = new Set();

    while (randomPodcasts.length < numeroPodcasts && latestPodcasts.length > 0) {
      const randomIndex = Math.floor(Math.random() * latestPodcasts.length);
      if (!usedIndexes.has(randomIndex)) {
        usedIndexes.add(randomIndex);
        randomPodcasts.push(latestPodcasts[randomIndex]);
      }
    }

    return randomPodcasts;
  };

  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return '<span class="' + className + '">' + (index + 1) + '</span>';
    },
  };

  const handlePodcastClick = (podcast) => {
    updateAudioUrl(podcast.url_audio);
    updateSelectedPodcast(podcast);
    updateVisibility(true);
  }

  return (
    <Fragment>
      <div className="latest-slider-wrapper">
        {randomPodcasts.length > 0 ? (
          <Swiper
            pagination={pagination}
            modules={[Pagination]}
            slidesPerView={slidesPerViewNumber}
            spaceBetween={120}
            className="mySwiper"
          >
            {randomPodcasts.map((podcast, index) => (
              <SwiperSlide key={index}>
                <a onClick={() => handlePodcastClick(podcast)}>
                  <div className="latest-slider-fade">
                    <div className="latest-info-img">
                      <h5>{podcast.title}</h5>
                      <p>{podcast.category}</p>
                    </div>
                    <img
                      className="latest-slider-img"
                      src={podcast.url_img}
                      alt={`Image ${index + 1}`}
                    />
                  </div>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Loader />
        )}
      </div>
    </Fragment>
  );
};

export default LatestSlider;
