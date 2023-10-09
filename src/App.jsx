import confetti from "canvas-confetti";
import { useState } from "react";
import "./App.css";
import { Square } from "./components/Square";
import { Winner } from "./components/Winner";
import { TURNS, WINNER_COMBOS } from "./constants";

function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem("board");

    return boardFromStorage
      ? JSON.parse(boardFromStorage)
      : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(()=> {
    const turnFromStorage = window.localStorage.getItem("turn");

    return turnFromStorage
      ? JSON.parse(turnFromStorage)
      :  TURNS.x;
   
    
  });
  // null es que no hay ganador ,false es que hay empate
  const [winner, setWiner] = useState(null);

  const checkWinner = boardToCheck => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
        return boardToCheck[a];
      }
    }
    // si no hay ganador
    return null;
  };

  const checkEndGame = newBoard => {
    // ni no hay espacios vacios en el tablero ,hay empate
    return newBoard.every(square => square !== null);
  };

  const updateBoard = index => {
    if (board[index] || winner) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    const newTurn = turn === TURNS.x
      ? TURNS.O
      : TURNS.x;
    setTurn(newTurn);
    // guardar aqui la partida
    window.localStorage.setItem("board", JSON.stringify(newBoard));
    window.localStorage.setItem("turn", JSON.stringify(newTurn));
    // revisar si hay ganador
    const newWinner = checkWinner(newBoard);
    if (newWinner) {
      confetti();
      setWiner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWiner(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setWiner(null);
    window.localStorage.removeItem("board")
    window.localStorage.removeItem("turn")
  };

  return (<main className="board">
    <h1>Tic Tac Toe</h1>
    <button onClick={resetGame}>Reset del juego</button>
    <section className="game">
      {
        board.map((_, index) => {
          return (<Square index={index} key={index} updateBoard={updateBoard}>
            {board[index]}
          </Square>);
        })
      }
    </section>
    <section className="turn">
      <Square isSelected={turn === TURNS.x}>{TURNS.x}</Square>
      <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
    </section>

    <Winner winner={winner} resetGame={resetGame}/>
  </main>);
}

export default App;
