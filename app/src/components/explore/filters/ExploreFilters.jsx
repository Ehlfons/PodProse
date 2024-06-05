import { Fragment } from "react";
import { usePodcasts } from "@components/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRotateLeft } from "@fortawesome/free-solid-svg-icons";

import "./ExploreFilters.css";

const ExploreFilters = () => {
  const {
    podcastCategories,
    filters,
    handleFilterChange,
    applyFilters,
    resetFilters,
    fetchPodcasts,
  } = usePodcasts();

  return (
    <Fragment>
      <section className="filters-container-section">
        <section className="filters-explore">
          <input
            className="form-input-podcasts"
            type="text"
            name="creator"
            placeholder="Buscar por nombre de creador"
            value={filters.creator}
            onChange={handleFilterChange}
          />
          <input
            className="form-input-podcasts"
            type="text"
            name="title"
            placeholder="Buscar por nombre de podcast"
            value={filters.title}
            onChange={handleFilterChange}
          />
          <select
            name="category"
            value={filters.category || ""}
            className="form-input-podcasts"
            required
            onChange={handleFilterChange}
          >
            <option value="" disabled>
              Categoría
            </option>
            {podcastCategories &&
              podcastCategories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
          </select>
          <div className="filter-btn-container">
            <button
              className="form-input-podcasts filter-btn"
              onClick={applyFilters}
            >
              Filtrar
            </button>
            <i
              onClick={() => {
                resetFilters();
              }}
            >
              <FontAwesomeIcon icon={faArrowRotateLeft} />
            </i>
          </div>
        </section>
        <section className="filters-explore">
          <button className="form-input-podcasts filter-btn" onClick={()=>fetchPodcasts()}>
            Obtener podcasts
          </button>
        </section>
      </section>
    </Fragment>
  );
};

export default ExploreFilters;
