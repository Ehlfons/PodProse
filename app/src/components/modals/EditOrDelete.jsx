import { Fragment } from "react";
import { faGear, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePodcasts } from "@components/hooks";
import "./EditOrDelete.css";

const EditOrDelete = ({
  show,
  handleCloseModal
}) => {

  const {
    handleDeletePodcast,
    updateModalVisibility,
    getPodcastById,
    editingPodcastId,
    updateEditingPodcastId,
  } = usePodcasts();

  const handleEditClick = async (e) => {
    e.preventDefault();
    
    await getPodcastById(editingPodcastId);
    updateEditingPodcastId(editingPodcastId);
  }

  const handleDeleteClick = async (e) => {
    e.preventDefault();

    handleDeletePodcast(editingPodcastId);
    updateEditingPodcastId(null);
    updateModalVisibility(false);
  }

  return (
    <Fragment>
      {show && (
        <div className="modal-overlay" onClick={(e) => e.stopPropagation()}>
          <div className="modal">
            <div className="modal-header">
              <h1><FontAwesomeIcon icon={faGear} /> Acción</h1>
              <span className="cerrar-modal" onClick={handleCloseModal}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </div>
            <div className="modal-body">
              <button id="pause-btn" onClick={handleEditClick}>
                Editar
              </button>
              <button id="end-btn" onClick={handleDeleteClick}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default EditOrDelete;
