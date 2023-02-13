import React from 'react';
import './Button.css';

function Button({ children, handleClick }) {
  return (
    <button className="btn" onClick={handleClick}>
      {children}
    </button>
  );
}

export default Button;
