import { Fragment, useEffect, useState } from "react";
import { usePodcasts, useUsers } from "@components/hooks";
import { Podcast } from "@components/podcast";
import { Loader } from "@components/loader";
import "./ExplorePage.css";

const ExplorePage = () => {
  const { podcastsList, fetchPodcasts, updateAudioUrl, updateSelectedPodcast, updateVisibility } = usePodcasts();
  const { isLoading, updateIsLoading } = useUsers();
  const [randomPodcasts, setRandomPodcasts] = useState([]);

  useEffect(() => {
    updateIsLoading(true);
    fetchPodcasts();
    setTimeout(() => {
      updateIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (podcastsList.length > 0) {
      const shuffledPodcasts = [...podcastsList];
      for (let i = shuffledPodcasts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledPodcasts[i], shuffledPodcasts[j]] = [
          shuffledPodcasts[j],
          shuffledPodcasts[i],
        ];
      }
      setRandomPodcasts(shuffledPodcasts.slice(0, 16));
    }
  }, [podcastsList]);

  return (
    <Fragment>
      <main id="ep-main">
        <section className="filters-explore">
          Filtros
        </section>
       
        <section className="container-explore">
          {randomPodcasts.length > 0 ? (
            randomPodcasts.map((podcast, i) => {
              return (
                <Fragment key={podcast.id}>
                  <Podcast
                    key={i}
                    datos={podcast}
                    editbtn={false}
                    onClick={() => {
                      updateAudioUrl(podcast.url_audio);
                      updateSelectedPodcast(podcast);
                      updateVisibility(true);
                    }}
                  />
                </Fragment>
              );
            })
          ) : (
            <div className="error-message">
              No tienes podcasts publicados o no se han encontrado.
            </div>
          )}
        </section>
        {isLoading && <Loader />}
      </main>
    </Fragment>
  );
};

export default ExplorePage;
