import { Fragment } from "react";
import { usePodcasts } from "@components/hooks";
import Podcast from "@components/podcast/Podcast.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPodcast } from "@fortawesome/free-solid-svg-icons";
import { EditOrDelete } from "@components/modals";

import "./PodcastList.css";

const PodcastList = () => {
  const {
    updateAudioUrl,
    userPodcastsList,
    updateSelectedPodcast,
    updateVisibility,
    modalVisibility,
    updateModalVisibility,
    updateEditingPodcastId,
  } = usePodcasts();

  const handleModalVisibility = () => {
    updateModalVisibility(!modalVisibility);
    updateEditingPodcastId(null);
  };

  return (
    <Fragment>
      <section className="listado-podcasts">
        <div className="section-title">
          <i>
            <FontAwesomeIcon icon={faPodcast} />
          </i>
          <h1>Mis Podcasts</h1>
        </div>
        <div className="podcast-list-container">
          {userPodcastsList.length > 0 ? (
            userPodcastsList.map((podcast, i) => {
              return (
                <Fragment key={podcast.id}>
                  <Podcast
                    key={i}
                    datos={podcast}
                    editbtn={true}
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
        </div>
      </section>
      <EditOrDelete
        show={modalVisibility}
        handleCloseModal={handleModalVisibility}
      />
    </Fragment>
  );
};

export default PodcastList;
