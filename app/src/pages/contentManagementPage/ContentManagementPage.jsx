import { Fragment, useEffect } from "react";
import { usePodcasts, useUsers } from "@components/hooks";
import Loader from "@components/loader/Loader";
import { PodcastUpload, PodcastList } from "@components/uploadPodcasts";

import "./ContentManagementPage.css";

const ContentManagementPage = () => {
  const { fetchUserPodcasts } = usePodcasts();
  const { isLoading, updateIsLoading } = useUsers();

  useEffect(() => {
    updateIsLoading(true);
    fetchUserPodcasts();
    setTimeout(() => {
      updateIsLoading(false); /* Para evitar que se vea la renderización de los podcasts */
    }, 1500);
  } , []);

  return (
    <Fragment>
      <PodcastUpload />
      <PodcastList />

      {isLoading && <Loader />}
    </Fragment>
  );
};

export default ContentManagementPage;