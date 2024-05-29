import { Fragment, useState } from "react";

import {DeleteModal} from "@components/modals";
import { usePodcasts } from "@components/hooks";
import { EditIcon, DeleteOrClose } from "@components/svg";
import "./Podcast.css";

// Estructura de cada Podcast.
const Podcast = (props) => {
  const { podcast_id, title, description, createdAt, url_img } = props.datos; // Datos del podcast.
  const { actualizarErroresFormulario } = usePodcasts(); // Importado desde el contexto a través del hook usePodcasts.

  // Valor inicial del modal de confirmación.
  const valorInicialModal = false;

  // Nuevo estado para controlar el modal de confirmación.
  const [mostrarModal, setMostrarModal] = useState(valorInicialModal);
  const [mostrarModalPodcasts, setMostrarModalPodcasts] =
    useState(valorInicialModal);

  // Función para abrir el modal de edición.
  const abrirModalEditar = (e) => {
    e.stopPropagation(); // Evita que se active el sonido del podcast al hacer clic en el icono.
    setMostrarModalPodcasts(true); // Mostrar el modal de edición
    
    // Limpiar todos los errores al abrir el modal.
    actualizarErroresFormulario({
      title: undefined,
      description: undefined,
      audio_url: undefined,
    });
  };

  // Función para abrir el modal de confirmación.
  const abrirModal = (e) => {
    e.stopPropagation(); // Evita que se active el sonido del podcast al hacer clic en el icono.
    setMostrarModal(true);
  };

  // Función para cerrar el modal de confirmación.
  const cerrarModal = () => {
    setMostrarModal(false);
  };

  // Función para cerrar el modal de confirmación.
  const cerrarModalPodcasts = () => {
    setMostrarModalPodcasts(false);
  };

  // Función para formatear la fecha en formato europeo. (mover a una biblioteca cuando tengamos más funciones de uso general como esta)
  const formatearFechaEuropea = (fecha) => {
    const fechaFormateada = new Date(fecha);
    const dia = String(fechaFormateada.getDate()).padStart(2, "0");
    const mes = String(fechaFormateada.getMonth() + 1).padStart(2, "0");
    const anio = fechaFormateada.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  return (
    <Fragment>
      <article
        className="podcast"
        id={podcast_id}
        onClick={() => {
          props.onClick();
        }}
      >
        <img
          src={
            url_img
              ? url_img
              : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
          }
          alt={title}
        />
        <div className="podcast-info">
          <h2>
            <strong>{title}</strong>
            <div className="podcast-icons">
              <div
                alt="trash"
                className="trash"
                onClick={abrirModalEditar} // Al hacer clic en la papelera, se abre el modal.
              >
                <EditIcon/>
              </div>
              <div
                alt="trash"
                className="trash"
                onClick={abrirModal} // Al hacer clic en la papelera, se abre el modal.
              >
                <DeleteOrClose />
              </div>
            </div>
          </h2>
          <div className="podcast-info-text">
            <p>{description ? description : "Sin descripción."}</p>
            <p>{formatearFechaEuropea(createdAt)}</p>
          </div>
        </div>
      </article>

      <DeleteModal
        mostrar={mostrarModal} // Se le pasa el estado del modal, si es true se muestra, si es false se oculta.
        manejarCerrado={cerrarModal} // Se le pasa la función para cerrar el modal.
        idPodcast={podcast_id} // Se le pasa el ID del podcast.
      />
    </Fragment>
  );
};

export default Podcast;
