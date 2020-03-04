import React from 'react'

import'./Room.css'

const Room = ({room}) => {
    return (
        <div className="current_room_container">
            <h2 className="cr_title">You're in: {room.title}</h2>
            <h4 className="cr_title">Room id: {room.room_id}</h4>
            <p className="cr_content">{room.description}</p>
            <p className="cr_content">Items: {room.items}</p>
            <p className="cr_content">Terrain: {room.terrain}</p>
            <p className="cr_content">Cooldown: {room.cooldown}</p>
            <p className="cr_content">Exits: {room.exits}</p>
        </div>
    )
}

export default Room