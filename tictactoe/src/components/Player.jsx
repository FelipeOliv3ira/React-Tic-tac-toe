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

    let editablePlayerName = <span className="player-name">{playerName}</span>;

    if (editing) {
        editablePlayerName = <input type="text" required defaultValue={playerName} onChange={handleChange} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            <span className="player">
                {editablePlayerName}
                <span className="player-symbol">{symbol}</span>
                <button onClick={handleEditClick}>{editing ? 'Save' : 'Edit'}</button>
            </span>
        </li>
    );
}