import React from 'react';

import './pageLoader.scss';

const Loading = () => {
  return (
    <div className="loading">
      Chargement en cours...
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
