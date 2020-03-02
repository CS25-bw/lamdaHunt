import React, {useState, useEffect} from 'react'

import './Map.css'

const Map = ({room}) => {
    const [current, setCurrent] = useState({})

    useEffect(() => {
        setCurrent(room)
    }, [room])

    const createTable = () => {
        const danger = [302,422,426,455,457,361,415,242,339]
        const well = 55
        let graphMap
        let keys
        let x
        let y
        // Initialize a two dimensional array
        const twoDMap = new Array(79)
        for (let i = 0; i < twoDMap.length; i++) {
            twoDMap[i] = new Array(79)
        }
        for (let i = 0; i < twoDMap.length; i++) {
            for (let j = 0; j < twoDMap.length; j++) {
                    twoDMap[i][j] = <div className="space" ></div>
            }
        }

        // Check if graphMap is there, if yes set to variable
        if (localStorage.getItem('graphMap')) {
            graphMap = JSON.parse(localStorage.getItem('graphMap'))
     
            keys = Object.keys(graphMap)

            console.log("found rooms:", keys.length)
          
        }

        keys.map((key) => {
            x = graphMap[key].self.coordinates.slice(1,3)
            y = graphMap[key].self.coordinates.slice(4,6)
            const mapID = graphMap[key].self.room_id
            // console.log(key, x, y)
            twoDMap[y][x] = <div 
                                className={mapID === current.room_id ? "space room current" : danger.includes(mapID) ? "danger space" : mapID === well ? "well space" : "space room" }
                                key={mapID}>{mapID}
                            </div>
        })

        return twoDMap
    }

    let count = room.cooldown
    const timer = interval => {
        setInterval(() => console.log(count), interval)
        count ++
    }

     console.log(JSON.parse(localStorage.getItem('graphMap')))


    return (
        <div>
            <h2>The Map</h2>
            <div className="grid-container">
                {createTable()}
            </div>
            
            
        </div>
    )
}


export default Map
