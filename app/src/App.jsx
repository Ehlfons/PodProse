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
        <UsersProvider>
          <PodcastsProvider>
            <InfoProvider>
              <Header />
              <main>
                <Routes />
                <Toaster richColors />
                <CustomAudioPlayer />
              </main>
              <FooterWrapper />
            </InfoProvider>
          </PodcastsProvider>
        </UsersProvider>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
