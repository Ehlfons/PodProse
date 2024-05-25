import { useState, createContext } from "react";
import axios from "axios";

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

  const podcastListInitialValue = [];
  const userPodcastsListInitialValue = [];
  const selectedPodcastInitialValue = {};

  // Estados.
  const [listadoPodcasts, setListadoPodcasts] = useState(arrayInicial);
  const [podcast, setPodcast] = useState(valoresInicialesPodcast); // Estado para guardar los datos del podcast.
  const [idPodcastActual, setIdPodcastActual] = useState(cadenaInicial); // Estado para guardar el ID del podcast actual.
  const [situacion, setSituacion] = useState(cadenaInicial);
  const [erroresPodcast, setErroresPodcast] = useState(arrayInicial); // Estado para guardar los errores del creación del podcast.
  const [cantidad, setCantidad] = useState(cadenaInicial);
  const [audioUrl, setAudioUrl] = useState(audioInicial);
  const [erroresFormulario, setErroresFormulario] = useState(valorInicialFormulario);
  const [podcastSeleccionadoId, setPodcastSeleccionadoId] = useState(audioInicial); // Estado para guardar el ID del podcast seleccionado.

  const [podcastsList, setPodcastsList] = useState(podcastListInitialValue); // Estado para guardar los podcasts.
  const [userPodcastsList, setUserPodcastsList] = useState(userPodcastsListInitialValue); // Estado para guardar los podcasts del usuario.
  const [selectedPodcast, setSelectedPodcast] = useState(selectedPodcastInitialValue); // Estado para guardar el podcast seleccionado.

  // Usuario para obtener el ID del usuario autenticado.
  const apiURL = import.meta.env.VITE_API_URL;

  // Función para obtener todos los podcasts.
  const fetchPodcasts = async () => {
    try {
      const response = await axios.get(`${apiURL}/upload`);

      setPodcastsList(response.data);
    } catch (error) {
      console.error('Error fetching podcasts:', error);
    }
  };

  // Función para obtener los podcasts del usuario.
  const fetchUserPodcasts = async () => {
    const id = localStorage.getItem('id');
    try {
      const response = await axios.get(`${apiURL}/upload/user/${id}`);
      
      setUserPodcastsList(response.data);
    } catch (error) {
      console.error('Error fetching user podcasts:', error);
    }
  };

  // Función para eliminar un podcast.
  const handleDeletePodcast = async (podcastId) => {
    try {
      await axios.delete(`http://localhost:3000/upload/podcast/${podcastId}`);
      setUserPodcastsList(podcasts.filter((podcast) => podcast.id !== podcastId));
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

  // Función para actualizar los datos del formulario al estado podcast.
  const cambiarDatosPodcast = (e) => {
    const { name, value } = e.target;
    setPodcast({ ...podcast, [name]: value });
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

    /* Estas validaciones son para URL VÁLIDAS, las que tenemos por el momento son de supabase y no permiten guardar los cambios, en un futuro activarlas ya que serán archivo en vez de urls */

    // Validar la URL del imagen del podcast si está presente.
    /* if (podcast.cover_image && podcast.cover_image.trim() !== "") {
      // Verificar si la URL del imagen es válida
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

  // Función para actualizar el ID del podcast actual.
  const actualizarIdPodcastActual = (nuevoValor) => {
    setIdPodcastActual(nuevoValor);
  };

  // Función para actualizar los errores del podcast.
  const actualizarErroresPodcast = (nuevoValor) => {
    setErroresPodcast(nuevoValor);
  };

  const actualizarErroresFormulario = (nuevoValor) => {
    setErroresFormulario(nuevoValor);
  };

  // Función para actualizar la cantidad de podcasts del podcast.
  const actualizarCantidad = (nuevoValor) => {
    setCantidad(nuevoValor);
  };

  const actualizarAudioUrl = (nuevoValor) => {
    setAudioUrl(nuevoValor);
  };

  const updateSelectedPodcast = (podcast) => setSelectedPodcast(podcast);

  // Datos a exportar al contexto.
  const datosAExportar = {
    listadoPodcasts,
    podcast,
    idPodcastActual,
    situacion,
    erroresPodcast,
    cantidad,
    audioUrl,
    erroresFormulario,
    podcastSeleccionadoId,
    podcastsList,
    userPodcastsList,
    selectedPodcast,
    updateSelectedPodcast,
    fetchPodcasts,
    fetchUserPodcasts,
    handleDeletePodcast,
    cambiarDatosPodcast,
    validarFormulario,
    actualizarIdPodcastActual,
    actualizarErroresPodcast,
    actualizarErroresFormulario,
    actualizarCantidad,
    actualizarAudioUrl,
  };

  return (
    <ContextoPodcasts.Provider value={datosAExportar}>
      {children}
    </ContextoPodcasts.Provider>
  );
};

export default ProveedorPodcasts;
export { ContextoPodcasts };