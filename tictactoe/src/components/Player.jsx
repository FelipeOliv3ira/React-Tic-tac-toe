import { useState } from 'react';

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [editing, setEditing] = useState(false);

    function handleEditClick() {
        setEditing((edit) => !edit);
    }

    function handleChange(event) {
        setPlayerName (event.target.value)
    }

    
    let editablePlayerName = <span className="player-name"><button onClick={handleEditClick}>{editing ? 'Save' : playerName}</button></span>;

    if (editing) {
        editablePlayerName = <div><input type="text" required defaultValue={playerName} onChange={handleChange} /><button onClick={handleEditClick}>Save</button></div>;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
            </span>
        </li>
    );
}