import React from 'react';

import './loading.scss';

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
