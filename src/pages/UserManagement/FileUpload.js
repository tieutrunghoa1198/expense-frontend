import React, { useState } from 'react';
import axios from 'axios';
import ImageList from './ImageList';
function FileUpload() {
  const [file, setFile] = useState(null);
  const [imageURL, setImageURL] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setImageURL(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async () => {
    try {

      const formData = new FormData();
      formData.append('image', file);

      const uploadResponse = await axios.post('http://localhost:8090/image/fileSystem', formData);

      const uploadImage = uploadResponse.data;
      console.log(uploadImage);

      // Fetch the uploaded image
      const imageURLResponse = await axios.get(`http://localhost:8090/image/fileSystem/${file.name}`, {
        responseType: 'arraybuffer',
      });

      const blob = new Blob([imageURLResponse.data], {
        type: 'image/png',
      });

      const imageUrl = URL.createObjectURL(blob);
      setImageURL(imageUrl);
      alert('File uploaded successfully!');
    } catch (error) {
      console.error(error);
      alert('File upload failed!');
      window.location.replace('http://localhost:3000/error');
    }
  };

  return (
    <div>
      <h1>Image Uploader</h1>
      <input type="file" onChange={handleFileChange} />
      {imageURL && <img src={imageURL} alt="Selected" style={{ width: '200px', height: 'auto' }} />}
      <button onClick={handleUpload}>Upload</button>
      {imageURL && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={imageURL} alt="Uploaded" style={{ width: '200px', height: 'auto' }} />
        </div>
      )}
       <ImageList />
    </div>
  );
}

export default FileUpload;