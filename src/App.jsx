import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import GameOver from "./components/GameOver.jsx";

const PLAYERS={
  X: 'Player1',
  O: 'Player2',
};

const INITIAL_GAME_BOARD=[
  [null, null, null],
  [null, null, null],
  [null, null, null],
];


function deriveActivePlayer(gameTurns) {
  let curentPlayer='X';
  if (gameTurns.length>0&&gameTurns[0].player==='X') {
    curentPlayer='O';
  }
  return curentPlayer;
}

function deriveGameBoard(gameTurns) {
  let gameBoard=[...INITIAL_GAME_BOARD.map(Array => [...Array])];

  for (const turn of gameTurns) {
    const { square, player }=turn;
    const { row, col }=square;

    gameBoard[row][col]=player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner;

  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSymbol=gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSymbol=gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSymbol=gameBoard[combinations[2].row][combinations[2].column];

    if (firstSquareSymbol&&firstSquareSymbol===secondSquareSymbol&&
      firstSquareSymbol===thirdSquareSymbol) {
      winner=players[firstSquareSymbol];
    }
  }
  return winner;
}
function App() {
  const [players, setPlayers]=useState(PLAYERS);


  const [gameTurns, setGameTurns]=useState([]);

  const activePlayer=deriveActivePlayer(gameTurns);
  const gameBoard=deriveGameBoard(gameTurns);

  const winner=deriveWinner(gameBoard, players);
  const hasDraw=gameTurns.length===9&&!winner;

  function handleSelectSquare(rowIndex, colIndex) {

    // setActivePlayer((curActivePlayer) => curActivePlayer==='X'? 'O':'X');
    setGameTurns((prevTurns) => {
      const curentPlayer=deriveActivePlayer(prevTurns);

      const updatedTurns=[{ square: { row: rowIndex, col: colIndex }, player: curentPlayer }, ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(player, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [player]: newName };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer==='X'}
            onChangeName={handlePlayerNameChange} />

          <Player initialName={PLAYERS.O}
            symbol="0"
            isActive={activePlayer==='O'}
            onChangeName={handlePlayerNameChange} />
        </ol>
        {(winner||hasDraw)&&<GameOver winner={winner} onRestart={handleRestart} />}
        <h2>{winner? `${winner} won!`:`Current Player: ${activePlayer}`}</h2>
        <GameBoard onSelectSquare={handleSelectSquare}
          board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
