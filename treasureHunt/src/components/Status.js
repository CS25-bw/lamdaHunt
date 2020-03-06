import React from 'react'

import'./Room.css'

const Status = ({status}) => {
    return (
        <div className="current_room_container">
            <h2 className="cr_title">Welcome Player: {status.name}</h2>
            <p className="cr_content">Cool down: {status.cooldown}</p>
            <p className="cr_content">status id: {status.status_id}</p>
            <p className="cr_content">Encumbrance: {status.encumbrance}</p>
            <p className="cr_content">Strength: {status.strength}</p>
            <p className="cr_content">Speed: {status.speed}</p>
            <p className="cr_content">Inventory: {status.inventory}</p>
            <p className="cr_content">Gold: {status.gold}</p>
            <p className="cr_content">Status: {status.status}</p>
            <p className="cr_content">Footwear: {status.footwear}</p>
            <p className="cr_content">Body wear: {status.bodywear}</p>
        </div>
    )
}

export default Status