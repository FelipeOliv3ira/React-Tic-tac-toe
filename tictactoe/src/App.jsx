import { useState } from 'react'
import './App.css'
import Player from './components/Player'
import Board from './components/Board'

function App() {
    const [activePlayer, setActivePlayer] = useState('X');

    function handleTurn() {
        setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X');
    }


    return (
        <main>
            <div id="game">
                <ol id="players" className="highlight-player">
                    <Player initialName="Player 1" symbol="X" isActive={activePlayer === 'X'} />
                    <Player initialName="Player 2" symbol="O" isActive={activePlayer === 'O'} />
                </ol>
                <Board onSelectSquare={handleTurn} playerSymbol={activePlayer} />
            </div>
            
        </main>
  )
}

export default App
