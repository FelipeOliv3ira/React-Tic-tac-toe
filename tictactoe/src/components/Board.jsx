import { useState, Fragment } from 'react';
import Player from './Player';

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
];



export default function Board({ onSelectSquare, playerSymbol }) {
    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const [winner, setWinner] = useState(null);
    const [draw, setDraw] = useState(false);
    const [endgame, setEndgame] = useState(false);

    function handleVictory(board) {
        //somas
        var somaDiagonal = 0;
        var somaDiagonalInverso = 0;
        var boardCount = 0;
        for (var i = 0; i < 3; i++) {
            var somaVertical = 0;
            var somaHorizontal = 0;
            somaDiagonal += verifySymbol(board[i][i]);
            somaDiagonalInverso += verifySymbol(board[i][2 - i]);
            for (var j = 0; j < 3; j++) {
                somaVertical += verifySymbol(board[i][j]);
                somaHorizontal += verifySymbol(board[j][i]);
                if (board[i][j] != null) {
                    boardCount += 1;
                }
                if (somaHorizontal === 3 || somaVertical === 3) {
                    handleWin();
                }
            }
        }
        if (somaDiagonal === 3 || somaDiagonalInverso === 3) {
            handleWin();
        }
        console.log(boardCount);
        if (boardCount == 9 && winner ==  null) {
            setDraw(true);
            setEndgame(true);
        }

        function handleWin() {
            setWinner(playerSymbol);
            setEndgame(true);
        }

        function verifySymbol(squareSymbol) {
            if (squareSymbol === playerSymbol) {
                return 1;
            } else {
                return 0;
            }
        }
        
    }

    function handleSelectSquare(rowIndex, colIndex) {
        if (gameBoard[rowIndex][colIndex] === null && winner == null) {
            setGameBoard((prevGameBoard) => {
                const updatedBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
                updatedBoard[rowIndex][colIndex] = playerSymbol;
                handleVictory(updatedBoard);
                return updatedBoard;
            });
            
            onSelectSquare();
            
        }
    }

    function handleReset() {
        setGameBoard(initialGameBoard);
        setWinner(null);
        setDraw(false);
        setEndgame(false);
    }

    return (
        <Fragment>
            <ol id="game-board">
                {gameBoard.map((row, rowIndex) => (
                    <li key={rowIndex}>
                        <ol>
                            {row.map((playerSymbol, colIndex) => (
                                <li key={colIndex}>
                                    <button onClick={() => handleSelectSquare(rowIndex, colIndex)}>{playerSymbol}</button>
                                </li>
                            ))}
                        </ol>
                    </li>
                ))}
            </ol>
            <div>
                {winner && <div>You won, {winner}!</div>}
                {draw && <div>Draw!</div>}
                {endgame && <button onClick={() => handleReset()} > Reiniciar?</button>}
            </div>
        </Fragment>

    )
}