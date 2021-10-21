import React from 'react';

import './loader.scss';

interface LoaderProps {
  className?: string;
}

const Loader = ({ className }: LoaderProps) => {
  return (
    <>
      <div className={`${className ? className : ''} lds-ellipsis`}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </>
  );
};

Loader.defaultProps = {
  className: '',
};

export default Loader;
