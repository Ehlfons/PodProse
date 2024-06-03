import { Fragment, useEffect, useState } from "react";
import { HomeComponent } from "@components/home";
import { LatestComponent } from "@components/latest";
import { usePodcasts } from "@components/hooks";
import Loader from "@components/loader/Loader.jsx";
import SpamComponent from "@components/spam/SpamComponent.jsx";
import TrendsComponent from "@components/trends/TrendsComponent.jsx";

const MainPage = () => {
  const { fetchPodcasts, getTrendsPodcasts } = usePodcasts();
  const [isLoadingHome, setIsLoadingHome] = useState(true);

  useEffect(() => {
    fetchPodcasts();
    getTrendsPodcasts();
    setTimeout(() => {
      setIsLoadingHome(false);
    }, 1000);
  }
  , []);

  return (
    <Fragment>
      <main className="hp-main">
        <HomeComponent />
        <LatestComponent />
        <SpamComponent />
        <TrendsComponent />
        
        {isLoadingHome ? <Loader /> : null}
      </main>
    </Fragment>
  );
};

export default MainPage;
