import { Fragment } from "react";
import usePodcasts from "../../../hooks/usePodcasts.jsx";
import "./FormularioPodcasts.css";

const FormularioPodcasts = ({cierre}) => {
  const {
    podcast,
    situacion,
    cambiarDatosPodcast,
    updatePodcast,
    validarFormulario,
    erroresFormulario,
    actualizarErroresFormulario,
  } = usePodcasts();

  // Manejador del evento clic del botón Crear Podcast.
  const manejarClick = (e) => {
    const { esValido, errores } = validarFormulario(podcast); // Validar el formulario.

    if (esValido) {
      updatePodcast(e);
      cierre(); // Cerrar el modal.
      
      // Limpiar todos los errores al enviar el formulario.
      actualizarErroresFormulario({
        title: undefined,
        description: undefined,
        cover_image: undefined,
        audio_url: undefined,
      });
    } else {
      actualizarErroresFormulario(errores); // Actualizar el estado de los errores.
    }
  };

  return (
    <Fragment>
      <div id="detailsformsmodal">
        {situacion.length > 0 ? (
          situacion
        ) : (
          <div id="formulariomodal">
            <p>
              <label
                className="labelmodal"
                htmlFor="title"
              >
                Título:{" "}
              </label>
              <input
                className="inputmodal"
                type="text"
                name="title"
                value={podcast.title || ""}
                onChange={(e) => {
                  cambiarDatosPodcast(e);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresFormulario((prevErrores) => ({
                    ...prevErrores,
                    title: undefined,
                  }));
                }}
              />
              {erroresFormulario.title ? (
                <small>{erroresFormulario.title}</small>
              ) : null}
            </p>
            <p>
              <label
                className="labelmodal"
                htmlFor="description"
              >
                Descripción:{" "}
              </label>
              <input
                className="inputmodal"
                type="text"
                name="description"
                value={podcast.description || ""}
                onChange={(e) => {
                  cambiarDatosPodcast(e);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresFormulario((prevErrores) => ({
                    ...prevErrores,
                    description: undefined,
                  }));
                }}
              />
              {erroresFormulario.description ? (
                <small>{erroresFormulario.description}</small>
              ) : null}
            </p>
            <p>
              <label className="labelmodal" htmlFor="cover_image">
                Imagen:{" "}
              </label>
              <input
                className="inputmodal"
                type="url"
                name="cover_image"
                value={podcast.cover_image || ""}
                onChange={(e) => {
                  cambiarDatosPodcast(e);
                  // Limpiar el error al cambiar el contenido del campo.
                  actualizarErroresFormulario((prevErrores) => ({
                    ...prevErrores,
                    cover_image: undefined,
                  }));
                }}
              />
              {erroresFormulario.cover_image ? (
                <small>{erroresFormulario.cover_image}</small>
              ) : null}
            </p>
            <p>
              <label
                className="labelmodal"
                htmlFor="audio_url"
              >
                Audio:{" "}
              </label>
              <input
                className="inputmodal"
                type="url"
                name="audio_url"
                value={podcast.audio_url || ""}
                onChange={(e) => {
                  cambiarDatosPodcast(e);
                }}
              />
            </p>
            <p>
              <button
                className="actualizar-podcast-modal"
                onClick={(e) => {
                  manejarClick(e);
                }}
              >
                Actualizar Podcast
              </button>
            </p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FormularioPodcasts;