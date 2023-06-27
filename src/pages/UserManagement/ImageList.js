import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ImageList() {
    const [imageData, setImageData] = useState([]);

    useEffect(() => {
      const fetchImageData = async () => {
        try {
          const response = await axios.get('http://localhost:8090/image');
          setImageData(response.data);
        } catch (error) {
          console.error('Error fetching image data:', error);
        }
      };
  
      fetchImageData();
    }, []);
  
    return (
      <div>
        {imageData.map((imageContent, index) => (
          <img className='img-thumbnail m-1' key={index} src={`data:image/jpg,${imageContent}`} alt={`Image ${index}`} />
        ))}
      </div>
    );
}

export default ImageList;
