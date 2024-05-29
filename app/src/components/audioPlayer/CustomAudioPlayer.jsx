import { Fragment } from "react";
import { usePodcasts } from "@components/hooks";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import "./CustomAudioPlayer.css";

const CustomAudioPlayer = () => {
  const { audioUrl, selectedPodcast, updateAudioUrl, visibility, updateVisibility } = usePodcasts();
  
  return (
    <Fragment>
      {audioUrl && visibility && (
        <section className="audio-player-container">
          <div className="podcast-active">
            <img src={selectedPodcast.url_img} alt="Podcast Image" />
            <div className="podcast-active-text">
              <h3>{selectedPodcast.title}</h3>
              <p>{selectedPodcast.username}</p>
            </div>
          </div>
          <AudioPlayer
            className="custom-audio-player"
            src={audioUrl}
            controls
            autoPlay
            showJumpControls
            showDownloadProgress
            showFilledProgress
            showFilledVolume
            volumeJumpStep
            progressJumpStep
            defaultCurrentTime
            defaultDuration
            progressJumpSteps={{
              forward: 10000,
              backward: 10000
            }}
          />
          <div className="close-audio-player"
            onClick={()=>{
              updateVisibility(false);
              updateAudioUrl(null);
            }}>
            <FontAwesomeIcon icon={faTimes}/>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default CustomAudioPlayer;
