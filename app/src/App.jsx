import { Fragment } from "react";
import { Toaster } from "sonner";
import { BrowserRouter } from "react-router-dom";
import { Header } from "@components/header";
import { UsersProvider, PodcastsProvider, InfoProvider } from "@contexts/index";
import { CustomAudioPlayer } from "@components/audioPlayer";
import { FooterWrapper } from "@components/footer";
import Routes from "@components/routes/Routes";
import "./App.css";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <PodcastsProvider>
          <InfoProvider>
            <UsersProvider>
              <Header />
                <Routes />
                <Toaster richColors />
                <CustomAudioPlayer />
              <FooterWrapper />
            </UsersProvider>
          </InfoProvider>
        </PodcastsProvider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
