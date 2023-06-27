import React, { useEffect, useState } from 'react';
import { getMapData } from '../util/naverMapApi';

const NaverMapComponent = () => {
  const [mapData, setMapData] = useState(null);

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        // const data = await getMapData('some_location');
        const data = await getMapData('36.3501713, 127.3848386');
        setMapData(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMapData();
  }, []);

  // Render the map component using mapData

  return <div>{/* Render the map component */}</div>;
};

export default NaverMapComponent;
