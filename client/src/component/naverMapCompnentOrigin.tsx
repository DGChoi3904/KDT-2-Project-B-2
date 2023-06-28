import React from 'react';
import { Helmet } from 'react-helmet';
import NaverMapApi from '../util/naverMapApi';

const App = () => {
  return (
    <div>
      <Helmet>
        <script
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=hwwivs3rlv"
          type="text/javascript"
        />
      </Helmet>
      <NaverMapApi />
      {/* 다른 컴포넌트 */}
      {/* ... */}
    </div>
  );
};

export default App;
