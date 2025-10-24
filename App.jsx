import React, { useState } from 'react';
import Board from './Board';
import './App.css';

const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function isValidSudoku(board) {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const seen = new Set();
    for (let col = 0; col < 9; col++) {
      const value = board[row][col];
      if (value !== 0) {
        if (seen.has(value)) {
          return false;
        }
        seen.add(value);
      }
    }
  }

  // Check columns
  for (let col = 0; col < 9; col++) {
    const seen = new Set();
    for (let row = 0; row < 9; row++) {
      const value = board[row][col];
      if (value !== 0) {
        if (seen.has(value)) {
          return false;
        }
        seen.add(value);
      }
    }
  }

  // Check 3x3 grids
  for (let gridRow = 0; gridRow < 3; gridRow++) {
    for (let gridCol = 0; gridCol < 3; gridCol++) {
      const seen = new Set();
      for (let row = gridRow * 3; row < gridRow * 3 + 3; row++) {
        for (let col = gridCol * 3; col < gridCol * 3 + 3; col++) {
          const value = board[row][col];
          if (value !== 0) {
            if (seen.has(value)) {
              return false;
            }
            seen.add(value);
          }
        }
      }
    }
  }

  return true;
}

const App = () => {
  const [board, setBoard] = useState(initialBoard);

  const handleCellChange = (row, col, value) => {
    // create a deep-ish copy so we don't mutate state directly
    const newBoard = board.map(r => [...r]);
    const v = value === '' ? 0 : parseInt(value, 10);
    if (value === '') {
      newBoard[row][col] = 0;
    } else if (!Number.isNaN(v) && v >= 1 && v <= 9) {
      newBoard[row][col] = v;
    } else {
      // ignore invalid input
      return;
    }
    setBoard(newBoard);
  };

  const handleCheckSolution = () => {
    if (isValidSudoku(board)) {
      alert('Congratulations! The solution is correct.');
    } else {
      alert('There are mistakes in the solution.');
    }
  };

  return (
    <div className="app">
      <h1>Sudoku Game</h1>
      <Board board={board} onCellChange={handleCellChange} />
      <button onClick={handleCheckSolution}>Check Solution</button>
    </div>
  );
};

export default App;