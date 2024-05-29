import { usePodcasts } from "@components/hooks";
import Podcast from "@components/podcast/Podcast.jsx";

const PodcastList = () => {
  const { updateAudioUrl, userPodcastsList, updateSelectedPodcast, updateVisibility } = usePodcasts();

  return (
    <div className="listado-podcasts">
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
  );
};

export default PodcastList;
