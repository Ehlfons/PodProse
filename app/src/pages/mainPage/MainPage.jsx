import { Fragment } from "react";
import { HomeComponent } from "@components/home";
import { LatestComponent } from "@components/latest";
import Loader from "@components/loader/Loader.jsx";
import SpamComponent from "@components/spam/SpamComponent.jsx";
import TrendsComponent from "@components/trends/TrendsComponent.jsx";
import { useUsers } from "@components/hooks";

const MainPage = () => {
  const { isLoading } = useUsers();
  return (
    <Fragment>
      <main>
        <HomeComponent />
        <LatestComponent />
        <SpamComponent />
        <TrendsComponent />
        {isLoading && <Loader />}
      </main>
    </Fragment>
  );
};

export default MainPage;
