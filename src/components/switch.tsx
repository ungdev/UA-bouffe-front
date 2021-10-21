import React from 'react';
import './switch.scss';

interface SwitchProps {
  on: boolean;
}

const Switch = ({ on }: SwitchProps) => {
  return (
    <div className="switch">
      <div className={`button ${!on ? 'o' : ''}`}>O</div>
      <div className={`button ${on ? 'i' : ''}`}>I</div>
    </div>
  );
};

export default Switch;
