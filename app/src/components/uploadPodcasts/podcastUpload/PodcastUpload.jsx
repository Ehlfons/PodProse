import { Fragment, useRef } from "react";
import { usePodcasts } from "@components/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";
import Podcast from "@components/podcast/Podcast";
import "./PodcastUpload.css";

const PodcastUpload = () => {
  const {
    title,
    description,
    updateDescription,
    updateTitle,
    audioFile,
    imageFile,
    updateAudioFileChange,
    updateImageFileChange,
    postPodcast,
    formatDate,
    imagePreview,
  } = usePodcasts();

  // Crear referencias para los inputs de archivo
  const imageInputRef = useRef(null);
  const audioInputRef = useRef(null);

  const handleImageUploadClick = () => {
    imageInputRef.current.click();
  };

  const handleAudioUploadClick = () => {
    audioInputRef.current.click();
  };

  const today = new Date();

  console.log(imageFile)

  return (
    <Fragment>
      <section className="upload-podcast-section">
        <div className="section-title">
          <i><FontAwesomeIcon icon={faCloudArrowUp} /></i>
          <h1>Subir Podcast</h1>
        </div>
        <form className="upload-podcast-form">
          <div className="input-label">
            <label className="form-input-label required-input-label" htmlFor="title">Título:</label>
            <input
              className="form-input-podcasts"
              type="text"
              placeholder="Título del podcast..."
              name="title"
              value={title}
              maxLength={64}
              onChange={(e) => updateTitle(e.target.value)}
              required
            />
          </div>
          
          <div className="input-label">
            <input
              type="file"
              onChange={(e) => updateImageFileChange(e)}
              ref={imageInputRef}
              accept="image/*"
              style={{ display: "none" }}
              required
            />
            <label className="form-input-label required-input-label" htmlFor="title">Imagen de portada:</label>
            <div className="file-upload form-input-podcasts">
              <button className="examinar-btn" type="button" onClick={handleImageUploadClick}>
                Examinar
              </button>
              {imageFile && <span>{imageFile.name ? imageFile.name : "No se ha seleccionado ningún archivo."}</span>}
            </div>
          </div>

          <div className="input-label">
            <input
              type="file"
              onChange={(e) => updateAudioFileChange(e)}
              ref={audioInputRef}
              accept="audio/*"
              style={{ display: "none" }}
              required
            />
            <label className="form-input-label required-input-label" htmlFor="title">Archivo de audio</label>
            <div className="file-upload form-input-podcasts">
              <button className="examinar-btn" type="button" onClick={handleAudioUploadClick}>
                Examinar
              </button>
              {audioFile && <span>{audioFile.name ? audioFile.name : "No se ha seleccionado ningún archivo."}</span>}
            </div>
          </div>

          <div className="input-label">
            <label className="form-input-label required-input-label" htmlFor="title">Descripción:</label>
            <textarea
              className="form-input-podcasts"
              placeholder="Dale a tu público una pequeña descripción de tu podcast..."
              value={description}
              maxLength={100}
              onChange={(e) => updateDescription(e.target.value)}
              required
            />
          </div>

          <div className="input-label">
            <label className="form-input-label" htmlFor="title">Previsualización:</label>
            <div className="podcast-preview podcast">
              {imageFile ? <img className="object-cover" src={imagePreview} alt="Vista previa de la portada" /> : <img className="object-cover" src="https://via.placeholder.com/80" alt="Vista previa de la portada" />}
              <div className="podcast-info">
                <div className="podcast-title-description">
                  <h2 className="podcast-title">{title ? title : "#1 - Título del podcast"}</h2>
                  <p>{description ? description : "Descripción del podcast"}</p>
                </div>
                <div className="podcast-info-text">
                  <p>{formatDate(today)}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="form-sendbtn-container">
            <p>obligatorio</p>
            <button className="send-podcast" onClick={postPodcast}>Publicar</button>
            </div>
        </form>
      </section>
    </Fragment>
  );
};

export default PodcastUpload;
