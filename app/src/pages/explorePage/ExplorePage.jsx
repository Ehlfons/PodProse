import { Fragment, useEffect } from "react";
import { usePodcasts, useUsers } from "@components/hooks";
import { ExploreFilters, ExplorePodcasts } from "@components/explore";
import "./ExplorePage.css";

const ExplorePage = () => {
  const {
    fetchPodcasts,
    getPodcastsCategories,
  } = usePodcasts();
  const { updateIsLoading } = useUsers();

  useEffect(() => {
    updateIsLoading(true);
    fetchPodcasts();
    getPodcastsCategories();
    setTimeout(() => {
      updateIsLoading(false);
    }, 2000);
  }, []);

  return (
    <Fragment>
      <main id="ep-main">
        <ExploreFilters />
        <ExplorePodcasts />
      </main>
    </Fragment>
  );
};

export default ExplorePage;
