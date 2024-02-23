import { Fragment } from "react";
import HomeComponent from "../components/Main/Home/HomeComponent.jsx";
import LatestComponent from "../components/Main/Latest/LatestComponent.jsx";
import SpamComponent from "../components/Main/Spam/SpamComponent.jsx";
import TrendsComponent from "../components/Main/Trends/TrendsComponent.jsx";

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
