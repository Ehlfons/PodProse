import React, { useState } from 'react';
import axios from 'axios';

const FileDisplay = () => {
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState(null);

  const handleFileNameChange = (event) => {
    setFileName(event.target.value);
  };

  const handleFetchFile = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/upload/${fileName}`, {
        responseType: 'blob', // Important for binary data
      });

      const url = URL.createObjectURL(new Blob([response.data]));
      setFileContent(url);
    } catch (error) {
      console.error('Error fetching file:', error);
      alert('Error fetching file');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file name"
        value={fileName}
        onChange={handleFileNameChange}
      />
      <button onClick={handleFetchFile}>Fetch File</button>
      {fileContent && (
        <div>
          <a href={fileContent} download={fileName}>Download File</a>
          <iframe src={fileContent} width="600" height="400" title="file preview"></iframe>
        </div>
      )}
    </div>
  );
};

export default FileDisplay;