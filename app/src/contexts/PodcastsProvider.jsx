import { useState, createContext } from "react";
import { toast } from "sonner";
import axios from "axios";

// Contexto para las listas.
const PodcastsContext = createContext();

const PodcastsProvider = ({ children }) => {
  // Valores iniciales.
  const PodcastInitialValue = {
    title: null,
    description: null,
    cover_image: null,
    audio_url: null,
  };

  const podcastListInitialValue = [];
  const userPodcastsListInitialValue = [];
  const selectedPodcastInitialValue = {};
  const audioUrlInitialValue = null;
  const visibilityInitialValue = false;
  const audioFileInitialValue = null;
  const imageFileInitialValue = null;
  const titleInitialValue = "";
  const descriptionInitialValue = "";

  // Estados.
  const [podcast, setPodcast] = useState(PodcastInitialValue); // Estado para guardar los datos del podcast.
  const [audioUrl, setAudioUrl] = useState(audioUrlInitialValue); // Estado para guardar la URL del audio.
  const [visibility, setVisibility] = useState(visibilityInitialValue); // Estado para guardar la visibilidad del reproductor.

  const [podcastsList, setPodcastsList] = useState(podcastListInitialValue); // Estado para guardar los podcasts.
  const [userPodcastsList, setUserPodcastsList] = useState(userPodcastsListInitialValue); // Estado para guardar los podcasts del usuario.
  const [selectedPodcast, setSelectedPodcast] = useState(selectedPodcastInitialValue); // Estado para guardar el podcast seleccionado.
  const [audioFile, setAudioFile] = useState(audioFileInitialValue);
  const [imageFile, setImageFile] = useState(imageFileInitialValue);
  const [title, setTitle] = useState(titleInitialValue);
  const [description, setDescription] = useState(descriptionInitialValue);
  
  // Variables
  const apiURL = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("id");
  
  // Función para enviar los datos del formulario al servidor.
  const postPodcast = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', audioFile);
    formData.append('files', imageFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Podcast publicado');
    } catch (error) {
      toast.error('Error de red');
    }
  };

  // Función para obtener todos los podcasts.
  const fetchPodcasts = async () => {
    try {
      const response = await axios.get(`${apiURL}/content`);

      setPodcastsList(response.data);
    } catch (error) {
      toast.error('Error de red');
    }
  };

  // Función para obtener los podcasts del usuario.
  const fetchUserPodcasts = async () => {
    const id = localStorage.getItem('id');
    try {
      const response = await axios.get(`${apiURL}/content/user/${id}`);
      
      setUserPodcastsList(response.data);
    } catch (error) {
      toast.error('Error de red');
    }
  };

  // Función para eliminar un podcast.
  const handleDeletePodcast = async (podcastId) => {
    try {
      await axios.delete(`http://localhost:3000/content/podcast/${podcastId}`);
      setUserPodcastsList(podcasts.filter((podcast) => podcast.id !== podcastId));
    } catch (error) {
      toast.error('Error de red');
    }
  };

  // Función para actualizar los datos del formulario al estado podcast.
  const updatePodcast = (e) => {
    const { name, value } = e.target;
    setPodcast({ ...podcast, [name]: value });
  };

  // Funcion para validar el formulario
  const validateForm = (podcast) => {
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

  const updateAudioFileChange = (e) => setAudioFile(e.target.files[0]);
  const updateImageFileChange = (e) => setImageFile(e.target.files[0]);

  const updateAudioUrl = (url) => setAudioUrl(url);
  const updateSelectedPodcast = (podcast) => setSelectedPodcast(podcast);
  const updateVisibility = (value) => setVisibility(value);
  const updateDescription = (description) => setDescription(description);
  const updateTitle = (title) => setTitle(title);

  // Datos a exportar al contexto.
  const dataToExport = {
    podcast,
    podcastsList,
    userPodcastsList,
    selectedPodcast,
    audioUrl,
    visibility,
    audioFile,
    imageFile,
    title,
    description,

    updateSelectedPodcast,
    updatePodcast,
    updateAudioUrl,
    updateVisibility,
    updateDescription,
    updateTitle,
    
    updateAudioFileChange,
    updateImageFileChange,
    postPodcast,
    fetchPodcasts,
    fetchUserPodcasts,
    handleDeletePodcast,
    validateForm,
  };

  return (
    <PodcastsContext.Provider value={dataToExport}>
      {children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsProvider;
export { PodcastsContext };