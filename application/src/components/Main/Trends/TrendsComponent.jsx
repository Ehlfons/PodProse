import { Fragment } from "react";
import "./TrendsComponent.css";

const TrendsComponent = () => {
  return (
    <Fragment>
      <section className="container-trends">
        <div className="trends-wrapper">
          <div className="container-trends-title">
            <h2 className="trends-title">Contenido en tendencia</h2>
            <hr className="trends-title-greenLine" />
            <h5 className="trends-showMore">Ver más</h5>
          </div>
          {/* sigo yo con esto que quiero cambiar cosas */}         
        </div>
      </section>
    </Fragment>
  );
};

export default TrendsComponent;
