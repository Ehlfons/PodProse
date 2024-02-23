import { Fragment } from "react";
import "./LatestSlider.css";

const LatestSlider = () => {
  // Objeto JSON con las imágenes de los creadores (cambiar a supabase).
  const json = {
    image1: "src/assets/Test/trend1.jpg",
    image2: "src/assets/Test/trend2.jpg",
    image3: "src/assets/Test/trend3.jpg",
    image4: "src/assets/Test/trend4.jpg",
    image5: "src/assets/Test/trend5.jpg",
    image6: "src/assets/Test/trend6.jpg",
    image7: "src/assets/Test/trend7.jpg",
    image8: "src/assets/Test/trend8.jpg",
    image9: "src/assets/Test/trend9.jpg",
    image10: "src/assets/Test/trend10.jpg",
    image11: "src/assets/Test/trend11.jpg",
    image12: "src/assets/Test/trend12.jpg",
    image13: "src/assets/Test/trend13.jpg",
    image14: "src/assets/Test/trend14.jpg",
    image15: "src/assets/Test/trend15.jpg",
    image16: "src/assets/Test/trend16.png",
    image17: "src/assets/Test/trend17.jpg",
    image18: "src/assets/Test/trend18.jpg",
  };

  /**
   * Obtiene imágenes aleatorias (y enlaces) de un objeto JSON (cambiar a supabase).
   * @param {Object} json - Objeto JSON que contiene las imágenes.
   * @param {number} numeroImagenes - Número de imágenes aleatorias a obtener.
   * @returns {Array} - Array de objetos que contienen la imagen y el enlace correspondiente.
   */
  const getRandomImages = (json, numeroImagenes) => {
    const keys = Object.keys(json);
    const randomKeys = [];

    // Obtiene un número aleatorio de claves del objeto JSON.
    while (randomKeys.length < numeroImagenes) {
      const randomKey = keys[Math.floor(Math.random() * keys.length)];
      if (!randomKeys.includes(randomKey)) {
        randomKeys.push(randomKey);
      }
    }

    // Devuelve un array de objetos con la imagen y el enlace correspondiente.
    return randomKeys.map((key) => ({
      image: json[key],
      link: `creador/${key}`,
    }));
  };

  const randomImages = getRandomImages(json, 3);

  return (
    <Fragment>
      <div className="latest-slider-wrapper">
        {randomImages.map((creador, index) => (
          <div key={index}>
            <a href={creador.link}>
              <div className="latest-slider-fade">
                <div className="latest-info-img">
                  <h5>This is the perfect mic if you need quality</h5>
                  <p>Category Name</p>
                </div>
                <img
                  className="latest-slider-img"
                  src={creador.image}
                  alt={`Image ${index + 1}`}
                  onClick={() => {
                    window.location.href = creador.link; // Redirige a la página del creador.
                  }}
                />
              </div>
            </a>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default LatestSlider;
