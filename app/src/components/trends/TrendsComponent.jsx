import { Fragment } from "react";
import { usePodcasts } from "@components/hooks"
import TrendsCard from "./TrendsCard";
import "./TrendsComponent.css";

const TrendsComponent = () => {
  const { trendContentPodcasts } = usePodcasts()

  return (
    <Fragment>
      <section className="container-trends">
        <div className="trends-wrapper">
          <div className="container-trends-title">
            <h2 className="trends-title">Contenido en tendencia</h2>
            <hr className="trends-title-greenLine" />
            <h5 className="trends-showMore">Ver más</h5>
          </div>
          <div className="trends-cards">
            {trendContentPodcasts.map((category, index) => (
              <TrendsCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default TrendsComponent;
