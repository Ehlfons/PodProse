import { Fragment, useEffect } from "react";
import { usePodcasts, useUsers } from "@components/hooks";
import { Podcast } from "@components/podcast";
import { Loader } from "@components/loader";

import "./ExplorePodcasts.css";

const ExplorePodcasts = () => {
  const {
    updateAudioUrl,
    updateSelectedPodcast,
    updateVisibility,
    randomPodcasts,
    updateRandomPodcasts,
    podcastsList,
  } = usePodcasts();

  const { isLoading } = useUsers();

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
      updateRandomPodcasts(shuffledPodcasts.slice(0, 100));
    }
  }, [podcastsList]);

  return (
    <Fragment>
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
            <div className="no-podcasts-msg">No se han encontrado podcasts</div>
          )}
        </section>
        {isLoading && <Loader />}
    </Fragment>
  );
};

export default ExplorePodcasts;
