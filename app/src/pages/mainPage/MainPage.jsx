import { Fragment, useEffect, useState } from "react";
import { HomeComponent } from "@components/home";
import { LatestComponent } from "@components/latest";
import Loader from "@components/loader/Loader.jsx";
import SpamComponent from "@components/spam/SpamComponent.jsx";
import TrendsComponent from "@components/trends/TrendsComponent.jsx";

const MainPage = () => {
  const [isLoadingHome, setIsLoadingHome] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingHome(false);
    }, 1000);
  }
  , []);

  return (
    <Fragment>
      <main>
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
