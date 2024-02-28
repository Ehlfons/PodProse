import { useState, useEffect, createContext } from "react";
import { supabaseConexion } from "../config/supabase.js";
import useUsuarios from "../hooks/useUsuarios.jsx";

// Contexto para las listas.
const ContextoPodcasts = createContext();

const ProveedorPodcasts = ({ children }) => {
  // Valores iniciales.
  const arrayInicial = [];
  const cadenaInicial = "";
  const valoresInicialesPodcast = {
    title: null,
    description: null,
    cover_image: null,
    audio_url: null,
  };
  const audioInicial = null;
  const valorInicialFormulario = {};

  // Estados.
  const [listadoPodcasts, setListadoPodcasts] = useState(arrayInicial);
  const [podcast, setPodcast] = useState(valoresInicialesPodcast); // Estado para guardar los datos de la podcast.
  const [idPodcastActual, setIdPodcastActual] = useState(cadenaInicial); // Estado para guardar el ID de la podcast actual.
  const [situacion, setSituacion] = useState(cadenaInicial);
  const [erroresPodcast, setErroresPodcast] = useState(arrayInicial); // Estado para guardar los errores de la creación de la podcast.
  const [cantidad, setCantidad] = useState(cadenaInicial);
  const [audioUrl, setAudioUrl] = useState(audioInicial);
  const [erroresFormulario, setErroresFormulario] = useState(
    valorInicialFormulario
  );
  const [podcastSeleccionadoId, setPodcastSeleccionadoId] =
    useState(audioInicial);

  // Usuario para obtener el ID del usuario autenticado.
  const { usuario } = useUsuarios();

  // Función para obtener el listado de Podcasts.
  const obtenerListadoPodcasts = async () => {
    // Si el usuario está autenticado, se obtienen las listas.
    if (usuario) {
      try {
        const { data, error } = await supabaseConexion
          .from("podcasts")
          .select("*")
          .eq("user_id", usuario.id); // Se obtienen las listas del usuario autenticado.

        if (error) {
          throw error;
        } else {
          setListadoPodcasts(data);
        }
      } catch (error) {
        setSituacion(`Error al obtener el listado: ${error.message}`);
      }
    } else {
      // Si el usuario no está autenticado, se muestra un mensaje.
      setSituacion("El usuario no está autenticado.");
    }
  };

  //Función para obtener los datos de un registro.
  const getPodcast = async (podcast_id) => {
    try {
      setPodcastSeleccionadoId(podcast_id);
      const { data, error } = await supabaseConexion
        .from("podcasts")
        .select("*")
        .eq("podcast_id", podcast_id);

      if (error) {
        throw error;
      }

      setPodcast(data[0]); // Se actualiza el estado "podcast" con los datos del registro, para que el formulario se rellene con los datos del producto. El data[0] es porque el resultado de la consulta es un array con un único elemento.
    } catch (error) {
      setSituacion(`Error al obtener los datos del podcast: ${error.message}`);
    }
  };

  // Función para eliminar una podcast.
  const deletePodcast = async (podcast_id) => {
    try {
      const { error } = await supabaseConexion
        .from("podcasts")
        .delete()
        .eq("podcast_id", podcast_id); // Se borra la podcast con el id indicado.

      if (error) {
        throw error;
      }

      // Si el podcast que se está reproduciendo se elimina, detenemos la reproducción.
      if (
        audioUrl ===
        listadoPodcasts.find((podcast) => podcast.podcast_id === podcast_id)
          ?.audio_url
      ) {
        setAudioUrl(null);
      }

      // Se crea un nuevo array sin el podcast eliminado.
      const podcastsFiltrados = listadoPodcasts.filter(
        (podcast) => podcast.podcast_id !== podcast_id
      );

      // Se actualiza el estado con los nuevos datos.
      setListadoPodcasts(podcastsFiltrados);
    } catch (error) {
      setSituacion(`Error al eliminar el podcast: ${error.message}`);
    }
  };

  // Función para actualizar los datos del formulario al estado podcast.
  const cambiarDatosPodcast = (e) => {
    const { name, value } = e.target;
    setPodcast({ ...podcast, [name]: value });
  };

  const updatePodcast = async () => {
    try {
      const { error } = await supabaseConexion
        .from("podcasts")
        .update(podcast)
        .eq("podcast_id", podcast.podcast_id);

      if (error) {
        throw error;
      }

      // Se crea un nuevo array con los cambios del formulario.
      const podcastsCambiados = listadoPodcasts.map((podcastPrev) => {
        return podcastPrev.id === podcast.podcast_id ? podcast : podcastPrev; // Si el id del podcast del listado es igual al id del podcast del formulario, se devuelve el podcast del formulario, si no, se devuelve el podcast del listado.
      });

      // Se actualiza el estado con los nuevos datos.
      setListadoPodcasts(podcastsCambiados);

      // Se borra el formulario tras el cambio.
      setPodcast(valoresInicialesPodcast);

      // Actualizar el listado de podcasts con los nuevos cambios para que el precio promedio del resumen se actualice.
      obtenerListadoPodcasts();
    } catch (error) {
      setSituacion(`Error al actualizar el podcast: ${error.message}`);
    }
  };

  // Funcion para validar el formulario
  const validarFormulario = (podcast) => {
    const errores = {}; // Objeto para almacenar los errores.

    // Validar el título del podcast.
    if (!podcast.title || podcast.title.trim() === "") {
      errores.title = "El título es obligatorio.";
    }

    // Validar la descripción del podcast si está presente.
    if (podcast.description && podcast.description.length > 240) {
      errores.description =
        "La descripción no puede superar los 240 caracteres.";
    }

    // Validar la URL de la imagen del podcast si está presente.
    /* if (podcast.cover_image && podcast.cover_image.trim() !== "") {
      // Verificar si la URL de la imagen es válida
      const urlExpresion = /^(https?:\/\/)?[\w\-_.]+$/i;
      const esURLValida = urlExpresion.test(podcast.cover_image);
      if (!esURLValida) {
        errores.cover_image =
          "Por favor, ingrese una URL válida para la imagen.";
      }
    } */

    // Validar la URL del audio del podcast.
    /* if (!podcast.audio_url || podcast.audio_url.trim() === "") {
      errores.audio_url = "La URL del audio es obligatoria.";
    } else {
      // Verificar si la URL del audio es válida
      const urlExpresion =
        /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.&%?#=]*)?$/;
      const esURLValida = urlExpresion.test(podcast.audio_url);
      if (!esURLValida) {
        errores.audio_url = "Por favor, ingrese una URL válida para el audio.";
      }
    } */

    const esValido = Object.keys(errores).length === 0; // Si el objeto "errores" está vacío, es porque no hay errores.

    return { esValido, errores };
  };

  // Función para actualizar el nombre de la podcast.
  const createPodcast = (nuevoValor) => {
    setPodcast({
      ...podcast,
      lista_nombre: nuevoValor, // Se actualiza el nombre de la podcast.
    });
  };

  // Función para actualizar el ID de la podcast actual.
  const actualizarIdPodcastActual = (nuevoValor) => {
    setIdPodcastActual(nuevoValor);
  };

  // Función para actualizar los errores de la podcast.
  const actualizarErroresPodcast = (nuevoValor) => {
    setErroresPodcast(nuevoValor);
  };

  const actualizarErroresFormulario = (nuevoValor) => {
    setErroresFormulario(nuevoValor);
  };

  // Función para actualizar la cantidad de podcasts de la podcast.
  const actualizarCantidad = (nuevoValor) => {
    setCantidad(nuevoValor);
  };

  const actualizarAudioUrl = (nuevoValor) => {
    setAudioUrl(nuevoValor);
  };

  // Efecto para obtener el listado de Podcasts.
  useEffect(() => {
    if (usuario.id) {
      obtenerListadoPodcasts();
    }
  }, [usuario]); // Se ejecuta cada vez que cambie el usuario, para obtener las listas del usuario con la sesión iniciada.

  // Datos a exportar al contexto.
  const datosAExportar = {
    listadoPodcasts,
    podcast,
    situacion,
    obtenerListadoPodcasts,
    /* getPodcastsPodcast, */
    deletePodcast,
    /* deletePodcastPodcast, */
    /* insertPodcast, */
    /* insertPodcastPodcast, */
    createPodcast,
    actualizarIdPodcastActual,
    idPodcastActual,
    erroresPodcast,
    actualizarErroresPodcast,
    validarFormulario,
    cantidad,
    actualizarCantidad,
    audioUrl,
    actualizarAudioUrl,
    updatePodcast,
    cambiarDatosPodcast,
    erroresFormulario,
    actualizarErroresFormulario,
    getPodcast,
    /* insertPodcastPodcastCantidad, */
  };

  return (
    <ContextoPodcasts.Provider value={datosAExportar}>
      {children}
    </ContextoPodcasts.Provider>
  );
};

export default ProveedorPodcasts;
export { ContextoPodcasts };
