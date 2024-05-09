import { Fragment } from "react";
import HomeComponent from "@components/home/homeComponent/HomeComponent.jsx";
import LatestComponent from "@components/latest/latestComponent/LatestComponent.jsx";
import SpamComponent from "@components/spam/SpamComponent.jsx";
import TrendsComponent from "@components/trends/TrendsComponent.jsx";

const MainPage = () => {
  return (
    <Fragment>
      <HomeComponent />
      <LatestComponent />
      <SpamComponent />
      <TrendsComponent />
    </Fragment>
  );
};

export default MainPage;