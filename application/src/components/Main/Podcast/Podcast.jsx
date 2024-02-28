import { Fragment, useState } from "react";
import "./Podcast.css";
import DeleteModal from "../../../modals/DeleteModal.jsx";
/* import PodcastsModal from "../../../modals/PodcastsModal.jsx"; */
import usePodcasts from "../../../hooks/usePodcasts.jsx";
import DeleteOrClose from "../../svg/DeleteOrClose.jsx";

// Estructura de cada Podcast.
const Podcast = (props) => {
  const {
    podcast_id,
    title,
    description,
    cover_image,
    audio_url,
    upload_date,
  } = props.datos; // Datos del podcast.
  const { idPodcastActual } = usePodcasts(); // Importado desde el contexto a través del hook usePodcasts.

  // Valor inicial del modal de confirmación.
  const valorInicialModal = false;

  // Nuevo estado para controlar el modal de confirmación.
  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);
  const [mostrarModalPodcasts, setMostrarModalPodcasts] =
    useState(valorInicialModal);

  // Función para abrir el modal de confirmación.
  const abrirModal = () => {
    setMostrarModal(true);
  };

  // Función para abrir el modal de confirmación.
  const abrirModalPodcasts = () => {
    setMostrarModalPodcasts(true);
  };

  // Función para cerrar el modal de confirmación.
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  // Función para cerrar el modal de confirmación.
  const cerrarModalPodcasts = () => {
    setMostrarModalPodcasts(false);
  };

  // Función para formatear la fecha en formato europeo.
  const formatearFechaEuropea = (fecha) => {
    const fechaFormateada = new Date(fecha);
    const dia = String(fechaFormateada.getDate()).padStart(2, '0');
    const mes = String(fechaFormateada.getMonth() + 1).padStart(2, '0'); // +1 porque los meses empiezan en 0.
    const anio = fechaFormateada.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  return (
    <Fragment>
      <article className="podcast" id={podcast_id}>
        <img src={cover_image} alt={title} />
        <div className="podcast-info">
          <h2>
            <strong>{title}</strong>
          </h2>
          <p>{description}</p>
          <p>{formatearFechaEuropea(upload_date)}</p>
        </div>
        <div
          src="src/assets/trash.svg"
          alt="trash"
          className="trash"
          onClick={abrirModal} // Al hacer clic en la papelera, se abre el modal.
        >
          <DeleteOrClose />
        </div>
      </article>

      {/* <PodcastsModal
        mostrarPodcasts={mostrarModalPodcasts} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
        manejarCerradoPodcasts={cerrarModalPodcasts} // Se le pasa la función para cerrar el modal.
        idPodcast={podcast_id} // Se le pasa el ID del podcast que se va a añadir a la lista.
      /> */}

      <DeleteModal
        mostrar={mostrarModal} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
        manejarCerrado={cerrarModal} // Se le pasa la función para cerrar el modal.
        idPodcast={podcast_id} // Se le pasa el ID del podcast.
      />
    </Fragment>
  );
};

export default Podcast;
