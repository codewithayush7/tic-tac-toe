import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onChangeName }) {

    const [playerName, setplayerName]=useState(initialName);
    const [isEditing, setIsEditing]=useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if (isEditing) {
            onChangeName(symbol, playerName);
        }
    }
    function handleChange(event) {
        setplayerName(event.target.value)
    }
    let editiableName=<span className="player-name">{playerName}</span>
    if (isEditing) {
        editiableName=<input type="text" required value={playerName} onChange={handleChange} />
    }
    return <li className={isActive? 'active':undefined}>
        <span className="player">
            {editiableName}
            <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEditClick}>{isEditing? 'Save':'Edit'}</button>
    </li>
}