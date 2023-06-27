import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import NaverMapComponent from './component/naverMapCompnent';

function App() {
  return (
    <div className="App">
      <NaverMapComponent />
    </div>
  );
}

export default App;
