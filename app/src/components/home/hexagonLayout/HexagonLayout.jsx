import { Fragment, useState, useEffect } from "react";
import { Hexagon } from "@components/home";
import {usePodcasts} from "@components/hooks";

import "./HexagonLayout.css";

const HexagonLayout = () => {
  const {podcastsList} = usePodcasts();

  const [randomPodcastsPerRow, setRandomPodcastsPerRow] = useState({
    first: [],
    second: [],
    third: [],
  });
  const [numberOfPodcasts, setNumberOfPodcasts] = useState(6);

  // Función para seleccionar aleatoriamente un conjunto de podcasts sin repetirse
  const selectRandomPodcasts = (usedIndexes) => {
    const availablePodcasts = podcastsList.filter((_, index) => !usedIndexes.has(index));
    const shuffled = availablePodcasts.sort(() => 0.5 - Math.random());
    const selectedPodcasts = shuffled.slice(0, numberOfPodcasts);
    selectedPodcasts.forEach(podcast => usedIndexes.add(podcastsList.indexOf(podcast)));
    return selectedPodcasts;
  };

  useEffect(() => {
    if (podcastsList.length) {
      const usedIndexes = new Set();
      setRandomPodcastsPerRow({
        first: selectRandomPodcasts(usedIndexes),
        second: selectRandomPodcasts(usedIndexes),
        third: selectRandomPodcasts(usedIndexes),
      });
    }
  }, [podcastsList, numberOfPodcasts]);

  return (
    <Fragment>
  <div className="container-hexagon-layout">
    <div className="hexagonArea first">
      {randomPodcastsPerRow.first.length ? (
        <Fragment>
          {randomPodcastsPerRow.first.map((podcast, index) => (
            <Fragment key={podcast.id}>
              <Hexagon
                class2={`hex-${index + 1}`}
                src={podcast.url_img}
                title={podcast.title}
                podcast={podcast}
              />
            </Fragment>
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <p className="error-message">No se han encontrado podcasts, prueba a reiniciar la página</p>
        </Fragment>
      )}
    </div>
    <div className="hexagonArea second">
      <div className="hexagon" id="short" />
      {randomPodcastsPerRow.second.length ? (
        <Fragment>
          {randomPodcastsPerRow.second.map((podcast, index) => (
            <Hexagon
              key={podcast.id}
              class2={`hex-${index + 1}`}
              src={podcast.url_img}
              title={podcast.title}
              podcast={podcast}
            />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <p className="error-message">No se han encontrado podcasts, prueba a reiniciar la página</p>
        </Fragment>
      )}
    </div>
    <div className="hexagonArea third">
      {randomPodcastsPerRow.third.length ? (
        <Fragment>
          {randomPodcastsPerRow.third.map((podcast, index) => (
            <Hexagon
              key={podcast.id}
              class2={`hex-${index + 1}`}
              src={podcast.url_img}
              title={podcast.title}
              podcast={podcast}
            />
          ))}
        </Fragment>
      ) : (
        <Fragment>
          <p className="error-message">No se han encontrado podcasts, prueba a reiniciar la página</p>
        </Fragment>
      )}
    </div>
  </div>
</Fragment>
  );
};

export default HexagonLayout;
