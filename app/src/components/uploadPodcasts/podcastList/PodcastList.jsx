import { usePodcasts } from "@components/hooks";
import Podcast from "@components/podcast/Podcast.jsx";

import "./PodcastList.css";

const PodcastList = () => {
  const {
    updateAudioUrl,
    userPodcastsList,
    updateSelectedPodcast,
    updateVisibility,
  } = usePodcasts();

  return (
    <section className="listado-podcasts">
      {userPodcastsList.length > 0 ? (
        userPodcastsList.map((podcast, i) => {
          return (
            <Podcast
              key={i}
              datos={podcast}
              onClick={() => {
                updateAudioUrl(podcast.url_audio);
                updateSelectedPodcast(podcast);
                updateVisibility(true);
              }}
            />
          );
        })
      ) : (
        <div className="error-message">
          No tienes podcasts publicados o no se han encontrado.
        </div>
      )}
    </section>
  );
};

export default PodcastList;
