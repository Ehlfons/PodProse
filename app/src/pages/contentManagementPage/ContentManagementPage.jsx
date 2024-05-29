import { Fragment, useEffect } from "react";
import { usePodcasts, useUsers } from "@components/hooks";
import Podcast from "@components/podcast/Podcast.jsx";
import Loader from "@components/loader/Loader";

import "./ContentManagementPage.css";

const ContentManagementPage = () => {
  const { updateAudioUrl, fetchUserPodcasts, userPodcastsList, updateSelectedPodcast, updateVisibility } = usePodcasts();
  const { isLoading, updateIsLoading } = useUsers();

  useEffect(() => {
    updateIsLoading(true);
    fetchUserPodcasts();
    setTimeout(() => {
      updateIsLoading(false); /* Para evitar que se vea la renderización de los podcasts */
    }, 1500);
  } , []);

  return (
    <Fragment>
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

      {isLoading && <Loader />}
    </Fragment>
  );
};

export default ContentManagementPage;
