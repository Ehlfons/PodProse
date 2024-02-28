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
    lista_nombre: null,
  };
  const audioInicial = null;

  // Estados.
  const [listadoPodcasts, setListadoPodcasts] = useState(arrayInicial);
  const [podcast, setPodcast] = useState(valoresInicialesPodcast); // Estado para guardar los datos de la podcast.
  const [idPodcastActual, setIdPodcastActual] = useState(cadenaInicial); // Estado para guardar el ID de la podcast actual.
  const [situacion, setSituacion] = useState(cadenaInicial);
  const [productosPodcast, setProductosPodcast] = useState(arrayInicial); // Estado para guardar los productos de la podcast.
  const [erroresPodcast, setErroresPodcast] = useState(arrayInicial); // Estado para guardar los errores de la creación de la podcast.
  const [cantidad, setCantidad] = useState(cadenaInicial);
  const [audioUrl, setAudioUrl] = useState(audioInicial);

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
      setSituacion(`Error al eliminar el producto: ${error.message}`);
    }
  };

  // Función para insertar la nueva podcast en la base de datos.
  /* const insertPodcast = async () => {
    try {
      const { error } = await supabaseConexion
        .from("lista_compra")
        .insert(podcast);

      if (error) {
        throw error;
      }

      // Actualizar el estado "listadoPodcasts" para que aparezca la nueva podcast.
      setListadoPodcasts([...listadoPodcasts, podcast]);

      // Borrar el formulario tras la creación de la podcast.
      setPodcast(valoresInicialesPodcast);

      // Borrar el listado de productos de la podcast.
      setProductosPodcast(arrayInicial);

      // Actualizar el listado de listas con los nuevos cambios.
      obtenerListadoPodcasts();
    } catch (error) {
      setSituacion(`Error al crear la podcast: ${error.message}`);
    }
  }; */

  // Función para validar el formulario.
  const validarFormulario = (podcast) => {
    const errores = {}; // Objeto para almacenar los errores.

    // Validar el nombre de la podcast.
    if (!podcast.lista_nombre || podcast.lista_nombre.trim() === "") {
      errores.lista_nombre = "El nombre de la podcast es obligatorio.";
    }

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

  // Función para actualizar la cantidad de productos de la podcast.
  const actualizarCantidad = (nuevoValor) => {
    setCantidad(nuevoValor);
  };

  const actualizarAudioUrl = (nuevoValor) => {
    setAudioUrl(nuevoValor);
  }

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
    /* getProductosPodcast, */
    productosPodcast,
    deletePodcast,
    /* deleteProductoPodcast, */
    /* insertPodcast, */
    /* insertProductoPodcast, */
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
    /* insertProductoPodcastCantidad, */
  };

  return (
    <ContextoPodcasts.Provider value={datosAExportar}>
      {children}
    </ContextoPodcasts.Provider>
  );
};

export default ProveedorPodcasts;
export { ContextoPodcasts };
