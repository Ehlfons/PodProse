import { Fragment, useEffect } from "react";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Podcast from "@components/podcast/Podcast.jsx";
import { usePodcasts, useUsers } from "@components/hooks";
import Loader from "@components/loader/Loader";

import "./ContentManagementPage.css";

const ContentManagementPage = () => {
  const { audioUrl, actualizarAudioUrl, fetchUserPodcasts, userPodcastsList, updateSelectedPodcast, selectedPodcast } = usePodcasts();
  const { isLoading, updateIsLoading } = useUsers();

  useEffect(() => {
    updateIsLoading(true);
    fetchUserPodcasts();
    setTimeout(() => {
      updateIsLoading(false); /* Para evitar que se vea la renderización de los podcasts */
    }, 1500);
  } , []);

  return (
    <Fragment>
      <div className="listado-podcasts">
        {userPodcastsList.length > 0 ? (
          userPodcastsList.map((podcast, i) => {
            return (
              <Podcast
                key={i}
                datos={podcast}
                onClick={() => {
                  actualizarAudioUrl(podcast.url_audio);
                  updateSelectedPodcast(podcast);
                }}
              />
            );
          })
        ) : (
          <div className="error-message">
            No tienes podcasts publicados o no se han encontrado.
          </div>
        )}
      </div>

      {audioUrl && (
        <section className="">
          <AudioPlayer
            className="custom-audio-player"
            src={audioUrl}
            controls
            autoPlay
            showSkipControls
            showJumpControls
            showDownloadProgress
            showFilledProgress
            showFilledVolume
            volumeJumpStep
            progressJumpStep
            defaultCurrentTime
            defaultDuration
            header={`Now playing: ${selectedPodcast.title}`}
          />
        </section>
      )}

      {isLoading && <Loader />}
    </Fragment>
  );
};

export default ContentManagementPage;
