import usePodcasts from "../hooks/usePodcasts";
import useUsuarios from "../hooks/useUsuarios";
import "./Modals.css";

function DeleteModal({ mostrar, manejarCerrado, idPodcast }) {
  const { deletePodcast } = usePodcasts(); // Importado desde el contexto a través del hook usePodcasts.
  const { usuario } = useUsuarios(); // Importado desde el contexto a través del hook useUsuarios.

  // Función para manejar el borrado del podcast.
  const manejarBorrado = () => {
    // Llama a la función deletePodcast con el ID del podcast.
    deletePodcast(idPodcast);

    // Cierra el modal después de eliminar el podcast.
    manejarCerrado();
  };

  return (
    <>
      {mostrar && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>Eliminar</h2>
              <span className="cerrar-modal" onClick={manejarCerrado}>
                {" "}
                {/* Al hacer clic en la X, se cierra el modal. */}
                &times;
              </span>
            </div>
            <div className="modal-body">
              <p>¿Seguro qué quieres eliminar el podcast?</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-cancelar" onClick={manejarCerrado}>
                {" "}
                {/* Al hacer clic en el botón cancelar, se cierra el modal. */}
                Cancelar
              </button>

              <button className="btn btn-confirmar" onClick={manejarBorrado}>
                {" "}
                {/* Al hacer clic en el botón confirmar, se ejecuta la función manejarBorrado y se elimina el podcast. */}
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;
