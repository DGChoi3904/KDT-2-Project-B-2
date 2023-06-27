import React from 'react';
import { Helmet } from 'react-helmet';

const App = () => {
  return (
    <div>
      <Helmet>
        <script
          src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_CLIENT_ID"
          type="text/javascript"
        />
      </Helmet>
      {/* 다른 컴포넌트 */}
      {/* ... */}
    </div>
  );
};

export default App;
