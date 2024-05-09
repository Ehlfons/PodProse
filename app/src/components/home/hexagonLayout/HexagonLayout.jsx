import { Fragment } from "react";
import Hexagon from "../hexagon/Hexagon.jsx";
import "./HexagonLayout.css";

const HexagonLayout = ({ userData = [] }) => {
  // Lo defino como un array vacio para que no de error si no se le pasa nada.
  // Función para generar un src aleatorio. (se cambiará cuando tengamos los suficientes usuarios con imágenes de perfil)
  const getRandomSrc = () => {
    // Supongamos que userData es un array de objetos de usuario, donde cada objeto tiene una propiedad 'profileImage' que contiene la URL de la imagen de perfil.
    const randomIndex = Math.floor(Math.random() * userData.length);
    return userData[randomIndex].profileImage;
  };
  return (
    <Fragment>
      <div className="container-hexagon-layout">
        <div className="hexagonArea first">
          {/* Verificar si hay datos en userData antes de hacer el mapeo */}
          {userData.length ? (
            userData.map((user, index) => (
              <Fragment key={index}>
                {/* Renderizar 6 hexágonos con imágenes diferentes */}
                {[...Array(6)].map((a, i) => (
                  <Hexagon key={i} src={getRandomSrc()} />
                ))}
              </Fragment>
            ))
          ) : (
            /* Código provisional hasta que tengamos los usuarios con imagen */
            <Fragment>
              <div className="hexagon">
                <img src="src/assets/Test/trend14.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend9.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend8.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend4.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend2.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend1.jpg" alt="" />
              </div>
            </Fragment>
          )}
        </div>
        <div className="hexagonArea second">
          <div className="hexagon" id="short">
            <img id="arrow" src="src/assets/Arrow.svg" alt="" />
          </div>
          {/* Verificar si hay datos en userData antes de hacer el mapeo */}
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <Fragment key={index}>
                {/* Renderizar 6 hexágonos con imágenes diferentes */}
                {[...Array(6)].map((a, i) => (
                  <Hexagon key={i} src={getRandomSrc()} />
                ))}
              </Fragment>
            ))
          ) : (
            <Fragment>
              <div className="hexagon">
                <img src="src/assets/Test/trend13.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend10.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend7.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend3.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend18.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend16.png" alt="" />
              </div>
            </Fragment>
          )}
        </div>
        <div className="hexagonArea third">
          {/* Verificar si hay datos en userData antes de hacer el mapeo */}
          {userData.length > 0 ? (
            userData.map((user, index) => (
              <Fragment key={index}>
                {/* Renderizar 6 hexágonos con imágenes diferentes */}
                {[...Array(6)].map((a, i) => (
                  <Hexagon key={i} src={getRandomSrc()} />
                ))}
              </Fragment>
            ))
          ) : (
            <Fragment>
              <div className="hexagon">
                <img src="src/assets/Test/trend12.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend11.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend6.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend5.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend17.jpg" alt="" />
              </div>
              <div className="hexagon">
                <img src="src/assets/Test/trend15.jpg" alt="" />
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default HexagonLayout;
