import { Fragment } from "react";
import { usePodcasts } from "@components/hooks";

const PodcastUpload = () => {
  const {
    title,
    description,
    setTitle,
    setDescription,
    updateAudioFileChange,
    updateImageFileChange,
    postPodcast,
  } = usePodcasts();
  return (
    <Fragment>
      <div>
        <form>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            type="file"
            onChange={updateImageFileChange}
            accept="image/*"
            required
          />
          <input
            type="file"
            onChange={updateAudioFileChange}
            accept="audio/*"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <button onClick={postPodcast}>Publicar</button>
        </form>
      </div>
    </Fragment>
  );
};

export default PodcastUpload;
