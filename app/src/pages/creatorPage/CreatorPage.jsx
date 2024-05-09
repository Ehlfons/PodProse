import { Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import Podcast from "@components/podcast/Podcast.jsx";
import usePodcasts from "@components/hooks/usePodcasts.jsx";
import "./CreatorPage.css";

const CreatorPage = () => {
  const { listadoPodcasts, audioUrl, actualizarAudioUrl } = usePodcasts();

  return (
    <Fragment>
      <div className="listado-podcasts">
        {listadoPodcasts.length > 0 ? (
          listadoPodcasts.map((podcast, i) => {
            return (
              <Podcast
                key={i}
                datos={podcast}
                onClick={() => {
                  actualizarAudioUrl(podcast.audio_url);
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
        <section className="reproductor-component">
          <ReactAudioPlayer
            className="reproductor"
            src={audioUrl}
            controls
            autoPlay
          />
        </section>
      )}
    </Fragment>
  );
};

export default CreatorPage;
