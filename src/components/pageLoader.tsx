import React, { ReactNode } from 'react';

import './pageLoader.scss';

const Loading = ({ children = null }: { children?: ReactNode }) => {
  return (
    <div className="loading">
      {children ? children : 'Chargement en cours...'}
      <div className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
