import { Fragment } from "react";
import "./MainText.css";

const MainText = () => {
  return (
    <Fragment>
      <div className="maintext-component">
        <h4 className="min-capitalize">
          <p>the ultimate</p>
        </h4>
        <h1 className="main-title">Podcasting experience</h1>
        <p className="main-paragraph">
          Descubre, escucha y sumérgete en podcasts <br />
          que te transportan a nuevos mundos. <br />
          Cada episodio es una invitación a una aventura <br />
          sonora inolvidable. ¡Conecta, aprende y déjate inspirar <br />
          con PodProse!
        </p>
        <div className="start-container">
          <img id="start-button" src="https://podprose-uploader.s3.amazonaws.com/Play-Green.svg" alt="Play" />
          <p id="start-text">Empieza a escuchar!</p>
        </div>
      </div>
    </Fragment>
  );
};

export default MainText;
