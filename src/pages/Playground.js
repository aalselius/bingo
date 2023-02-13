import React, { useState } from 'react';
import Button from '../components/Button';
import GameTile from '../components/GameTile';
import './Playground.css';

export default function Playground() {
  const [isActiveGame, setIsActiveGame] = useState(false);
  const [name, setName] = useState('');
  const [simpleGame, setSimpleGame] = useState(false);
  const [error, setError] = useState('');

  function handleChange(event) {
    setName(event.target.value);
  }

  function handleStart() {
    if (!name) {
      setError('Please submit a name');
    } else {
      setIsActiveGame(true);
    }
  }

  function handleSimpleGame() {
    if (!name) {
      setError('Please submit a name');
    } else {
      setIsActiveGame(true);
      setSimpleGame(true);
    }
  }

  return (
    <div>
      {isActiveGame ? (
        <div>
          <GameTile name={name} simpleGame={simpleGame} />
        </div>
      ) : (
        <div className="playground">
          <h1>Bingo</h1>
          <div>Please enter your name</div>
          <input className="input" onChange={handleChange} value={name}></input>
          {error ? <span className="error">{error}</span> : null}

          <Button handleClick={handleStart}>Start Game</Button>
          <Button handleClick={handleSimpleGame}>Start Simple Game</Button>
        </div>
      )}
    </div>
  );
}
