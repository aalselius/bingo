import React from 'react';
import { useState, useEffect } from 'react';

import Square from './Square';
import Button from './Button';

import './GameTile.css';

export default function GameTile({ name, simpleGame }) {
  const [numbers, setNumbers] = useState([
    ['B', 1, 2, 3, 4, 5],
    ['I', 16, 17, 18, 19, 20],
    ['N', 31, 32, 33, 34, 35],
    ['G', 46, 47, 48, 49, 50],
    ['O', 61, 62, 63, 64, 65],
  ]);
  const [pickedNumbers, setPickedNumbers] = useState([]);
  const [isClicked, setIsClicked] = useState(
    Array(5)
      .fill(false)
      .map(() => Array(5).fill(false))
  );
  const [isWin, setIsWin] = useState(false);

  const bingoString = ['B', 'I', 'N', 'G', 'O'];
  useEffect(() => {
    newGame();
  }, []);

  function newGame() {
    setIsWin(false);
    setIsClicked(
      Array(5)
        .fill(false)
        .map(() => Array(5).fill(false))
    );
    if (simpleGame) {
      let newArray = isClicked;
      newArray[2][2] = true;
      setIsClicked(newArray);
    }

    setNumbers([]);
    let bingoArray = [];
    bingoString.map((char, i) => {
      let array = [char];
      for (let index = 0; index < 5; index++) {
        let number = Math.floor(Math.random() * 15) + (i * 15 + 1);
        while (array.includes(number)) {
          number = Math.floor(Math.random() * 15) + (i * 15 + 1);
        }
        array.push(number);
      }
      bingoArray.push(array);
    });
    setNumbers(bingoArray);
  }

  function newNumber() {
    let pickedNumber = Math.floor(Math.random() * 75) + 1;
    while (pickedNumbers.includes(pickedNumber)) {
      pickedNumber = Math.floor(Math.random() * 75) + 1;
    }

    let newArray = [...pickedNumbers, pickedNumber];
    setPickedNumbers(newArray);
  }

  function checkForWin(position) {
    let tempArray = isClicked;
    tempArray[position[0]][position[1] - 1] = true;
    if (
      tempArray.some((v) => v.every((y) => y === true)) ||
      tempArray.every((z) => z[0] === true) ||
      tempArray.every((z) => z[1] === true) ||
      tempArray.every((z) => z[2] === true) ||
      tempArray.every((z) => z[3] === true) ||
      tempArray.every((z) => z[4] === true) ||
      (tempArray[0][0] === true &&
        tempArray[1][1] === true &&
        tempArray[2][2] === true &&
        tempArray[3][3] === true &&
        tempArray[4][4] === true) ||
      (tempArray[0][4] === true &&
        tempArray[1][3] === true &&
        tempArray[2][2] === true &&
        tempArray[3][1] === true &&
        tempArray[4][0] === true)
    ) {
      setIsWin(true);
    }
    setIsClicked(tempArray);
  }

  return (
    <div>
      <div className="msg">
        {isWin ? `Congratulation ${name}! You won!` : `Hello ${name}`}
      </div>
      <div className="gametile">
        {numbers.map((row, i) => {
          return (
            <div className="row">
              {row.map((square, j) => {
                return (
                  <Square
                    className="square"
                    number={square}
                    isClickable={pickedNumbers.includes(square)}
                    position={[i, j]}
                    checkForWin={checkForWin}
                    simpleGame={simpleGame}
                    key={square}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
      {isWin ? (
        <div>
          <button onClick={newGame}>New Game</button>
        </div>
      ) : (
        <div>
          <div>
            <Button handleClick={newNumber}>Pick new number</Button>
          </div>
        </div>
      )}

      <div className="pickedNumber">
        {pickedNumbers[pickedNumbers.length - 1]}
      </div>

      <div className="numberList">
        {pickedNumbers.map((number) => {
          return <span className="pickedNumbers">{number}</span>;
        })}
      </div>
      <div>Number of draw: {pickedNumbers.length}</div>
    </div>
  );
}
