import React from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="square" onClick={onClick}>
      {value === 'X' ? <span className="x-color">X</span> : value === 'O' ? <span className="o-color">O</span> : null}
    </button>
  );
}

function Board() {
  const [squares, setSquares] = React.useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = React.useState(true);
  // ...existing code...

  function handleClick(i) {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // ...existing code...

  const winner = calculateWinner(squares);
  let status;
  let statusClass = '';
  if (winner) {
    status = 'Winner!';
    statusClass = 'win-animation';
  } else if (squares.every(Boolean)) {
    status = 'Draw!';
    statusClass = 'tie-animation';
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  function renderSquare(i) {
    return (
      <Square value={squares[i]} onClick={() => handleClick(i)} />
    );
  }

  return (
    <div>
      <div className={`status ${statusClass}`}>{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  return (
    <div className="game">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}
