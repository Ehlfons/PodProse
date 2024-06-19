import { Fragment, useEffect } from "react";
import { usePodcasts, useUsers } from "@components/hooks";
import Loader from "@components/loader/Loader";
import { PodcastUpload, PodcastList } from "@components/uploadPodcasts";

import "./ContentManagementPage.css";

const ContentManagementPage = () => {
  const { fetchUserPodcasts, getPodcastsCategories } = usePodcasts();
  const { isLoading, updateIsLoading } = useUsers();

  useEffect(() => {
    updateIsLoading(true);
    fetchUserPodcasts();
    getPodcastsCategories();
    setTimeout(() => {
      updateIsLoading(false); /* Para evitar que se vea la renderización de los podcasts */
    }, 1500);
  }, []);

  return (
    <Fragment>
      <main id="cmp-main">
        <PodcastUpload />
        <div className="vertical-line-content"/>
        <PodcastList />
  
        {isLoading && <Loader />}
      </main>
    </Fragment>
  );
};

export default ContentManagementPage;