import { Fragment, useRef, useState } from "react";
import { usePodcasts } from "@components/hooks";

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

  return (
    <Fragment>
      <section className="upload-podcast-form">
        <form>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={(e) => updateImageFileChange(e)}
            ref={imageInputRef}
            accept="image/*"
            style={{ display: "none" }}
            required
          />
          <div className="file-upload">
            <button type="button" onClick={handleImageUploadClick}>
              Examinar
            </button>
            {imageFile && <span>{imageFile.name}</span>}
          </div>

          <input
            type="file"
            onChange={(e) => updateAudioFileChange(e)}
            ref={audioInputRef}
            accept="audio/*"
            style={{ display: "none" }}
            required
          />
          <div className="file-upload">
            <button type="button" onClick={handleAudioUploadClick}>
              Examinar
            </button>
            {audioFile && <span>{audioFile.name}</span>}
          </div>

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => updateDescription(e.target.value)}
            required
          />
          <button onClick={postPodcast}>Publicar</button>
        </form>
      </section>
    </Fragment>
  );
};

export default PodcastUpload;
