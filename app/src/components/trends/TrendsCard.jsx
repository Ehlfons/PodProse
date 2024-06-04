import { Fragment } from "react";
import {usePodcasts} from "@components/hooks";

const TrendsCard = ({ category, isLast }) => {
  const { updateAudioUrl, updateVisibility, updateSelectedPodcast } = usePodcasts();
  const { name, podcastCount } = category.category;
  const podcasts = category.podcasts;

  // Asegurarse de que hay al menos 4 podcasts para mostrar
  if (podcasts.length < 4) {
    return <div>No hay suficientes podcasts para mostrar.</div>; /* Ya esta verificado en backend, pero por si acaso */
  }

  return (
    <Fragment>
      <div className="trend-card">
        <div className="trend-category">
          <img src={podcasts[0].url_img} alt="category" 
            onClick={() => {
              updateAudioUrl(podcasts[0].url_audio);
              updateSelectedPodcast(podcasts[0]);
              updateVisibility(true);
            }}
          />
          <div className="trend-category-info">
            <h4 className="trend-category-title">{name}</h4>
            <p className="trend-num-podcasts">{podcastCount} podcasts</p>
            <p className="trend-description">{podcasts[0].description}</p>
          </div>
        </div>
        <div className="trend-podcasts">
          {podcasts.slice(1, 4).map((podcast, index) => (
            <div
              key={podcast.id}
              className="trend-podcast"
              onClick={() => {
                updateAudioUrl(podcast.url_audio);
                updateSelectedPodcast(podcast);
                updateVisibility(true);
              }}
            >
              <img src={podcast.url_img} alt={`podcast-${index}`} />
              <div className="trend-podcast-info">
                <h4 className="trend-podcast-title">{podcast.title}</h4>
                <p className="trend-stats-podcast">
                  {podcast.username}
                  <em className="trend-podcast-date">
                    {new Date(podcast.createdAt).toLocaleDateString()}
                  </em>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {!isLast && <hr className="trends-card-separator" />}
    </Fragment>
  );
};

export default TrendsCard;