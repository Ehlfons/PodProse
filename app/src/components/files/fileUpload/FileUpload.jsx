import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = localStorage.getItem('id');

  const handleAudioFileChange = (event) => {
    setAudioFile(event.target.files[0]);
  };

  const handleImageFileChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('files', audioFile);
    formData.append('files', imageFile);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', userId);

    try {
      await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Files uploaded successfully');
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={handleAudioFileChange} accept="audio/*" required />
        <input type="file" onChange={handleImageFileChange} accept="image/*" required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default FileUpload;