import { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {usePodcasts} from "@components/hooks";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import "./Podcast.css";

// Estructura de cada Podcast.
const Podcast = (props) => {
  const { podcast_id, title, description, createdAt, url_img } = props.datos; // Datos del podcast.
  const { formatDate } = usePodcasts();

  return (
    <Fragment>
      <article
        className="podcast"
        id={podcast_id}
        onClick={() => {
          props.onClick();
        }}
      >
        <img
          className="object-cover"
          src={
            url_img
              ? url_img
              : "https://img.freepik.com/vector-premium/vector-icono-imagen-predeterminado-pagina-imagen-faltante-diseno-sitio-web-o-aplicacion-movil-no-hay-foto-disponible_87543-11093.jpg"
          }
          alt={title}
        />
        <div className="podcast-info">
          <div className="podcast-title-description">
            <h2 className="podcast-title">{title}</h2>
            <p>{description ? description : "Sin descripción."}</p>
          </div>
          <div className="podcast-info-text">
            <p>{formatDate(createdAt)}</p>
          </div>
          <div className="podcast-icons">
            <div alt="edit" onClick={(e) => {
              e.stopPropagation();
              
            }}>
              <FontAwesomeIcon icon={faGear} />
            </div>
          </div>
        </div>
      </article>
    </Fragment>
  );
};

export default Podcast;
