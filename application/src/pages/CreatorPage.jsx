import { Fragment } from "react";
import ReactAudioPlayer from "react-audio-player";
import Podcast from "../components/Main/Podcast/Podcast.jsx";
import usePodcasts from "../hooks/usePodcasts.jsx";
import "./CreatorPage.css";

const CreatorPage = () => {
  const { listadoPodcasts, situacion } = usePodcasts();
  return (
    <Fragment>
      <div className="listado-podcasts">
        {listadoPodcasts.length > 0
          ? listadoPodcasts.map((podcast, i) => (
              <Podcast key={i} datos={podcast}/>
            ))
          : <div className="error-message">No tienes podcasts publicados o no se han encontrado.</div>}
      </div>

      <section className="reproductor-component">
        <ReactAudioPlayer
          className="reproductor"
          src="https://mynmamoycdmvyfbyrecg.supabase.co/storage/v1/object/sign/test_audios/movistar_oficial.mp3?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJ0ZXN0X2F1ZGlvcy9tb3Zpc3Rhcl9vZmljaWFsLm1wMyIsImlhdCI6MTcwOTA3Njc1MywiZXhwIjoxNzQwNjEyNzUzfQ.1JDmDPwG5uT7n5f887Z0s2PVOGjLXzqfdz4Yx4coYwg&t=2024-02-27T23%3A32%3A33.477Z"
          controls
        />
      </section>
    </Fragment>
  );
};

export default CreatorPage;