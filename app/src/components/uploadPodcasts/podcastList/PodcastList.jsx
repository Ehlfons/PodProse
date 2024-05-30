import { usePodcasts } from "@components/hooks";
import Podcast from "@components/podcast/Podcast.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";

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
      <div className="section-title">
        <i><FontAwesomeIcon icon={faPodcast} /></i>
        <h1>Mis Podcasts</h1>
      </div>
      <div className="podcast-list-container">
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
      </div>
    </section>
  );
};

export default PodcastList;
