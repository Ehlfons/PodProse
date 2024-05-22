import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FileList = () => {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/upload');
        setPodcasts(response.data);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  const handleDelete = async (podcastId) => {
    try {
      await axios.delete(`http://localhost:3000/upload/podcast/${podcastId}`);
      setPodcasts(podcasts.filter((podcast) => podcast.id !== podcastId));
    } catch (error) {
      console.error('Error deleting podcast:', error);
    }
  };

  return (
    <div>
      <h2>Podcasts</h2>
      <ul>
        {podcasts.map((podcast) => (
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
            <button onClick={() => handleDelete(podcast.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
