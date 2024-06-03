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
  }, [podcastsList]);

  return (
    <Fragment>
      <div className="container-hexagon-layout">
        <div className="hexagonArea first">
          {randomPodcastsPerRow.first.length ? (
            <Fragment>
              {randomPodcastsPerRow.first.map((podcast) => (
                <Fragment key={podcast.id}>
                  <Hexagon src={podcast.url_img} title={podcast.title}/>
                </Fragment>
              ))}
            </Fragment>
          ) : (
            <Fragment> {/* Podcasts falsos por si falla */}
              <div className="hexagon">
                <img src="src/assets/Test/trend14.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend9.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend8.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend4.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend2.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend1.jpg" alt="" />
              </div>
            </Fragment>
          )}
        </div>
        <div className="hexagonArea second">
          <div className="hexagon" id="short" />
          {randomPodcastsPerRow.second.length ? (
            <Fragment>
              {randomPodcastsPerRow.second.map((podcast, index) => (
                <Hexagon key={index} src={podcast.url_img} title={podcast.title} />
              ))}
            </Fragment>
          ) : (
            <Fragment> {/* Podcasts falsos por si falla */}
              <div className="hexagon">
                <img src="src/assets/Test/trend13.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend10.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend7.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend3.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend18.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend16.png" alt="" />
              </div>
            </Fragment>
          )}
        </div>
        <div className="hexagonArea third">
          {randomPodcastsPerRow.third.length ? (
            <Fragment>
              {randomPodcastsPerRow.third.map((podcast, index) => (
                <Hexagon key={index} src={podcast.url_img} title={podcast.title} />
              ))}
            </Fragment>
          ) : (
            <Fragment> {/* Podcasts falsos por si falla */}
              <div className="hexagon">
                <img src="src/assets/Test/trend12.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend11.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend6.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend5.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend17.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend15.jpg" alt="" />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HexagonLayout;
