import { useState, Fragment } from "react";
import { usePodcasts } from "@components/hooks";
import "./Hexagon.css";

const Hexagon = ({ src, title, podcast, class2 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const {updateAudioUrl, updateSelectedPodcast, updateVisibility} = usePodcasts();

  const handlePodcastClick = () => {
    updateAudioUrl(podcast.url_audio);
    updateSelectedPodcast(podcast);
    updateVisibility(true);
  }

  return (
    <Fragment>
      <div 
        onClick={handlePodcastClick}
        className={`hexagon ${class2}`}
        onMouseEnter={() => setIsHovered(true)} 
        onMouseLeave={() => setIsHovered(false)}
      >
        <img src={src} alt={title} />
        {isHovered && (
          <div className="hexagon-title-overlay">
            <p>{title}</p>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Hexagon;