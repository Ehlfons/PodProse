import { Fragment } from "react";
import FormularioPodcasts from "../components/Main/Formulario/FormularioPodcasts.jsx";

const PodcastsModal = ({ mostrarPodcasts, manejarCerradoPodcasts }) => {
  return (
    <Fragment>
      {mostrarPodcasts && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Editar Podcast</h2>
              <span className="cerrar-modal" onClick={manejarCerradoPodcasts}>
                &times;
              </span>
            </div>
            <div className="modal-body" id="modal-body">
              <FormularioPodcasts cierre={manejarCerradoPodcasts} />
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default PodcastsModal;