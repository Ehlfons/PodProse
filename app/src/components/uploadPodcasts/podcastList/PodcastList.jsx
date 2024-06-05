import { Fragment, useState } from "react";
import { usePodcasts } from "@components/hooks";
import Podcast from "@components/podcast/Podcast.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faPodcast } from "@fortawesome/free-solid-svg-icons";
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

  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredPodcasts = userPodcastsList.filter(podcast =>
    podcast.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Fragment>
      <section className="listado-podcasts">
        <div className="title-with-filter">
          <div className="section-title">
            <i>
              <FontAwesomeIcon icon={faPodcast} />
            </i>
            <h1>Mis Podcasts</h1>
          </div>
          <div className="input-filter-div">
            <i>
              <FontAwesomeIcon icon={faFilter}/>
            </i>
            <input
              className="form-input-podcasts"
              type="text"
              placeholder="Nombre del podcast..."
              value={searchText}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="podcast-list-container">
          {filteredPodcasts.length > 0 ? (
            filteredPodcasts.map((podcast, i) => {
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
              No tienes podcasts publicados o no se han encontrado
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
