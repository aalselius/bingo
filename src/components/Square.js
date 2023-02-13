import React from 'react';
import { useState } from 'react';

import './Square.css';

export default function Square({
  number,
  isClickable,
  checkForWin,
  position,
  simpleGame,
}) {
  const [clicked, setClicked] = useState(false);

  function handleClick() {
    if (isClickable) {
      setClicked(true);
      checkForWin(position);
    }
  }
  return (
    <div className="square" onClick={handleClick}>
      {clicked ? <div className="clicked"></div> : ''}
      {simpleGame && position[0] === 2 && position[1] === 3 ? 'FREE' : number}
    </div>
  );
}
