import React, { useState, useEffect } from 'react';
import * as blockstack from "blockstack"
import {
	fetchMove,
	fetchTake,
	fetchDrop,
	// fetchPray,
	fetchProof,
	fetchSell,
	fetchMine,
	fetchExamine,
	fetchChangeName,
} from '../actions';
import { useDispatch } from 'react-redux';
import { chart } from '../chart';

import Map from './Map';
import  CryptoJS from 'crypto-js'
import { validateProofs } from 'blockstack';
const Controls = ({ room, statusm, props }) => {
	const [prevRoom, setPrevRoom] = useState({});
	const [dirToPrev, setDirToPrev] = useState('');
	const [coolDown, setCoolDown] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		setCoolDown(room.cooldown);
	}, [room]);

	const handleMove = dir => {
		if (localStorage.getItem('graphMap')) {
			const graphMap = JSON.parse(localStorage.getItem('graphMap'));
			console.log('????', graphMap[room.room_id], room.room_id, graphMap);
			if (graphMap[room.room_id][dir] !== undefined) {
				const nextRoom = graphMap[room.room_id][dir];
				const strId = JSON.stringify(nextRoom.room_id);

				console.log('We gettin there________________', nextRoom.room_id);
				setPrevRoom(room);
				setDirToPrev(dir);
				dispatch(fetchMove(dir, strId));
				setTimeout(() => {
					console.log('OK TO MOVE, it has been: ', coolDown);
				}, coolDown * 1000);
			}
		} else {
			console.log("didn't, predict");
			setPrevRoom(room);
			setDirToPrev(dir);
			dispatch(fetchMove(dir));
			setTimeout(() => {
				console.log('OK TO MOVE, it has been 15 seconds', coolDown);
			}, coolDown * 1000);
		}
	};

	const autoMove = () => {
		const graphMap = JSON.parse(localStorage.getItem('graphMap'));
		const rooms = [];
		const possible = ['n', 's', 'e', 'w'];
		for (let dir in graphMap[room.room_id]) {
			if (possible.includes(dir)) {
				rooms.push(dir);
				handleMove(dir);
			}
		}
		console.log('+==============>', rooms);
	};

	const handleTake = item => {
		if (room.items[0]) {
			fetchTake(item);
		} else {
			console.log('Nothing to take');
		}
	};

	const handleDrop = item => {
		if (props.status.inventory[0]) {
			fetchDrop(item);
		} else {
			console.log('Nothing to drop');
		}
	};

   const  handleSell = item => {
		if ((props.status.inventory[0])) {
			fetchSell(item);
		} else {
			console.log('Nothing to sell');
		}
	};

	const handlePray = () => {
		fetchProof();
	};

	const handleExamine = name => {
		fetchExamine(name);
	};

	const handleChangeName = name => {
		fetchChangeName(name);
	};
	const handleProof =  () => {
	
		  fetchProof()
		  
		

	};
	const handleMine =  () => {
		
		
	
		 fetchMine('last_proof')  
		
	};


return (
	<>
		<div className="control-container">
			<button className="game-btn" onClick={() => handleMove('n')}>
				N
			</button>
			<button className="game-btn" onClick={() => handleMove('e')}>
				E
			</button>
			<button className="game-btn" onClick={() => handleMove('s')}>
				S
			</button>
			<button className="game-btn" onClick={() => handleMove('w')}>
				W
			</button>
		</div>
		<div>
			<button onClick={() => handleTake(room.items[0])}>Take Treasure</button>
			{/* <button onClick={() => handleDrop(props, prosstatus.inventory[0])}>Drop Treasure</button> */}
			<button onClick={() => handlePray()}>Pray</button>
			<button onClick={() => handleMine()}>Mine</button>
			<button onClick={() => handleProof()}>Proof</button>
			{/* <button onClick={() => handleSell(status.inventory[0])}>Sell</button> */}
			<button onClick={() => autoMove()}>Auto Move</button>
			<button onClick={() => handleExamine("well")}>Examine</button>
			<button onClick={() => handleChangeName('Mike')}>Change Name</button>
		</div>
		<>
			<Map room={room} />
		</>
	</>
);
}

export default Controls;
