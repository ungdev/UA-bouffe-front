import React, { ReactNode, useState, useRef, MouseEvent } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  id?: string;
}

const Scrollable = ({ children, className, id }: Props) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [posY, setPosY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: MouseEvent) => {
    if (ref.current !== null && mouseDown) {
      ref.current.scrollTo(0, scrollTop + (posY - e.pageY));
    }
  };

  const onMouseDown = (e: MouseEvent) => {
    setMouseDown(true);
    setPosY(e.pageY);
  };

  const onMouseUp = () => {
    setMouseDown(false);
    setScrollTop(ref.current.scrollTop);
  };

  return (
    <div
      className={`${className ? className : ''}`}
      id={`${id ? id : ''}`}
      ref={ref}
      onMouseDown={(e) => onMouseDown(e)}
      onMouseUp={() => onMouseUp()}
      onMouseLeave={() => setMouseDown(false)}
      onMouseMove={(e) => onMouseMove(e)}>
      {children}
    </div>
  );
};

export default Scrollable;
