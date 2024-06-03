import { useState, createContext, useEffect } from "react";
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
  const imagePreviewInitialValue = null;
  const modalVisibilityInitialValue = false;
  const isEditingInitialValue = false;
  const podcastImageEditInitialValue = null;
  const podcastAudioEditInitialValue = null;
  const editingPodcastIdInitialValue = null;
  const podcastSelectedByIdInitialValue = null;
  const trendContentPodcastsInitialValue = [];
  const podcastCategoriesInitialValue = null;
  const selectedPodcastCategoryInitialValue = null;

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
  const [imagePreview, setImagePreview] = useState(imagePreviewInitialValue);

  const [modalVisibility, setModalVisibility] = useState(modalVisibilityInitialValue);
  const [isEditing, setIsEditing] = useState(isEditingInitialValue);
  const [podcastImageEdit, setPodcastImageEdit] = useState(podcastImageEditInitialValue);
  const [podcastAudioEdit, setPodcastAudioEdit] = useState(podcastAudioEditInitialValue);
  const [editingPodcastId, setEditingPodcastId] = useState(editingPodcastIdInitialValue);
  const [podcastSelectedById, setPodcastSelectedById] = useState(podcastSelectedByIdInitialValue);
  const [trendContentPodcasts, setTrendContentPodcasts] = useState(trendContentPodcastsInitialValue);  
  const [podcastCategories, setPodcastCategories] = useState(podcastCategoriesInitialValue);
  const [selectedPodcastCategory, setSelectedPodcastCategory] = useState(selectedPodcastCategoryInitialValue);
  
  // Variables
  const apiURL = import.meta.env.VITE_API_URL;
  const userId = localStorage.getItem("id");
  
  // Función para enviar los datos del formulario al servidor.
  const postPodcast = async (e) => {
    e.preventDefault();

    if (!audioFile) {
      toast.warning('El archivo de audio es obligatorio');
      return;
    } else if (!imageFile) {
      toast.warning('La imagen del podcast es obligatoria');
      return;
    } else if (!title) {
      toast.warning('El título del podcast es obligatorio');
      return;
    } else if (!description) {
      toast.warning('La descripción del podcast es obligatoria');
      return;
    }

    const formData = new FormData();
    formData.append('files', audioFile);
    formData.append('files', imageFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('categoryId', selectedPodcastCategory);
    formData.append('userId', userId);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        toast.success('Podcast publicado');
        fetchUserPodcasts();
        clearForm();
        setEditingPodcastId(null);
      }
    } catch (error) {
      toast.error('Error al publicar el podcast');
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

  // Funcion para rellenar el formulario de edición con los datos del podcast seleccionado.
  const getPodcastById = async (podcastId) => {
    try {
      const response = await axios.get(`http://localhost:3000/content/podcast/${podcastId}`);

      setPodcastSelectedById(response.data);

      updateTitle(response.data.title);
      updateDescription(response.data.description);
      updatePodcastImageEdit(response.data.url_img.substring(response.data.url_img.lastIndexOf('/') + 1));
      updatePodcastAudioEdit(response.data.url_audio.substring(response.data.url_audio.lastIndexOf('/') + 1));
      updateImagePreview(response.data.url_img);
      updateEditingPodcastId(response.data.id);
      setSelectedPodcastCategory(response.data.categoryId);
      updateModalVisibility(false);
      updateIsEditing(true);

    } catch (error) {
      toast.error('Error de red');
    }
  };

  const getTrendsPodcasts = async () => {
    try {
      const response = await axios.get(`${apiURL}/categories/random`);

      setTrendContentPodcasts(response.data);
    } catch (error) {
      toast.error('Error de red');
    }
  };

  // Función para eliminar un podcast.
  const handleDeletePodcast = async (podcastId) => {
    try {
      await axios.get(`http://localhost:3000/content/podcast/${podcastId}`);

      try {
        const response = await axios.delete(`http://localhost:3000/content/podcast/${podcastId}`);

        if (response.status === 200) {
          toast.success("Podcast eliminado");
          fetchUserPodcasts();
          updateModalVisibility(false);
          clearForm();
          updateIsEditing(false);
        }
      } catch (error) {
        toast.error("Error de red");
      }
    } catch (error) {
      toast.error("Error de red");
    }
  };

  const resetEditing = () => {
    setEditingPodcastId(null);
    setModalVisibility(false);
    setIsEditing(false);
    clearForm();
    setSelectedPodcastCategory("");
  };

  // Función para actualizar el podcast.
  const handleEditPodcast = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('files', audioFile && audioFile);
    formData.append('files', imageFile && imageFile);
    formData.append('title', title && title);
    formData.append('description', description && description);
    formData.append('categoryId', selectedPodcastCategory && selectedPodcastCategory);
    formData.append('userId', userId);

    axios.patch(`http://localhost:3000/content/podcast/${editingPodcastId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        if (response.status === 200) {
          toast.success('Podcast actualizado');
          fetchUserPodcasts();
          updateModalVisibility(false);
          clearForm();
          updateIsEditing(false);
        }
      })
      .catch((error) => {
        toast.error('Error al actualizar el podcast');
      });
  };

  const getPodcastsCategories = async () => {
    try {
      const response = await axios.get(`${apiURL}/categories`);

      setPodcastCategories(response.data);
    } catch (error) {
      toast.error('Error de red');
    }
  };

  const clearForm = () => {
    setAudioFile(audioFileInitialValue);
    setImageFile(imageFileInitialValue);
    setTitle(titleInitialValue);
    setDescription(descriptionInitialValue);
    setImagePreview(imagePreviewInitialValue);
    setSelectedPodcastCategory(selectedPodcastCategoryInitialValue);
  };

  // Función para formatear la fecha en formato europeo. (mover a una biblioteca cuando tengamos más funciones de uso general como esta)
  const formatDate = (date) => {
    const formatedDate = new Date(date);
    const dia = String(formatedDate.getDate()).padStart(2, "0");
    const mes = String(formatedDate.getMonth() + 1).padStart(2, "0");
    const anio = formatedDate.getFullYear();
    return `${dia}-${mes}-${anio}`;
  };

  // Funcion para validar el formulario
  const validateForm = (podcast) => {
    const errores = {}; // Objeto para almacenar los errores.

    // Validar el título del podcast.
    if (!podcast.title || podcast.title.trim() === "") {
      errores.title = "El título es obligatorio";
    }

    // Validar el título del podcast.
    if (!podcast.title || podcast.title.length > 64) { 
      errores.title = "El título no puede superar los 64 caracteres.";
    }

    // Validar la descripción del podcast si está presente.
    if (podcast.description && podcast.description.length > 240) {
      errores.description =
        "La descripción no puede superar los 100 caracteres.";
    }

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

  const clearAllPodcasts = () => {
    setPodcastsList(podcastListInitialValue);
    setUserPodcastsList(userPodcastsListInitialValue);
    setSelectedPodcast(selectedPodcastInitialValue);
    setPodcast(PodcastInitialValue);
    setAudioUrl(audioUrlInitialValue);
    setVisibility(visibilityInitialValue);
    setAudioFile(audioFileInitialValue);
    setImageFile(imageFileInitialValue);
    setTitle(titleInitialValue);
    setDescription(descriptionInitialValue);
    setImagePreview(imagePreviewInitialValue);
    setModalVisibility(modalVisibilityInitialValue);
    setIsEditing(isEditingInitialValue);
    setPodcastImageEdit(podcastImageEditInitialValue);
    setPodcastAudioEdit(podcastAudioEditInitialValue);
    setEditingPodcastId(editingPodcastIdInitialValue);
    setPodcastSelectedById(podcastSelectedByIdInitialValue);
    setTrendContentPodcasts(trendContentPodcastsInitialValue);
    setPodcastCategories(podcastCategoriesInitialValue);
    setSelectedPodcastCategory(selectedPodcastCategoryInitialValue);
  };

  const updateAudioFileChange = (e) => setAudioFile(e.target.files[0]);
  const updateImageFileChange = (e) => {
    const file = e.target.files[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setImageFile(file);
    setImagePreview(imageUrl);
  }
  };

  const updateAudioUrl = (url) => setAudioUrl(url);
  const updateSelectedPodcast = (podcast) => setSelectedPodcast(podcast);
  const updateVisibility = (value) => setVisibility(value);
  const updateDescription = (description) => setDescription(description);
  const updateTitle = (title) => setTitle(title);
  const updateModalVisibility = (value) => setModalVisibility(value);
  const updateIsEditing = (value) => setIsEditing(value);
  const updatePodcastImageEdit = (value) => setPodcastImageEdit(value);
  const updatePodcastAudioEdit = (value) => setPodcastAudioEdit(value);
  const updateImagePreview = (value) => setImagePreview(value);
  const updateEditingPodcastId = (value) => setEditingPodcastId(value);
  const updateSelectedPodcastCategory = (value) => setSelectedPodcastCategory(value);

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
    imagePreview,
    modalVisibility,
    isEditing,
    podcastImageEdit,
    podcastAudioEdit,
    editingPodcastId,
    podcastSelectedById,
    trendContentPodcasts,
    podcastCategories,
    selectedPodcastCategory,

    updateSelectedPodcast,
    updateAudioUrl,
    updateVisibility,
    updateDescription,
    updateTitle,
    updateModalVisibility,
    updateIsEditing,
    updatePodcastImageEdit,
    updatePodcastAudioEdit,
    updateImagePreview,
    updateEditingPodcastId,
    updateSelectedPodcastCategory,
    
    updateAudioFileChange,
    updateImageFileChange,
    postPodcast,
    fetchPodcasts,
    fetchUserPodcasts,
    handleDeletePodcast,
    handleEditPodcast,
    validateForm,
    formatDate,
    clearForm,
    getPodcastById,
    resetEditing,
    clearAllPodcasts,
    getTrendsPodcasts,
    getPodcastsCategories,
  };

  return (
    <PodcastsContext.Provider value={dataToExport}>
      {children}
    </PodcastsContext.Provider>
  );
};

export default PodcastsProvider;
export { PodcastsContext };