import React, { useEffect } from 'react';
import {usePodcasts} from '@components/hooks';
import axios from 'axios';

const FileList = () => {
  const {podcastsList, fetchPodcasts, handleDeletePodcast} = usePodcasts();

  useEffect(() => {
    fetchPodcasts();
  }, []);

  return (
    <div>
      <h2>Podcasts</h2>
      <ul>
        {podcastsList.map((podcast) => (
          <li key={podcast.id}>
            <h3>{podcast.title}</h3>
            <p>{podcast.description}</p>
            {podcast.url_audio && (
              <audio controls>
                <source src={podcast.url_audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            )}
            {podcast.url_img && <img src={podcast.url_img} alt="Podcast cover" width="100" />}
            <button onClick={() => handleDeletePodcast(podcast.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
