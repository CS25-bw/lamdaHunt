

const opDir = dir => {
    return (
        dir === 'n' ? 's'
        : dir === 's' ? 'n'
        : dir === 'e' ? 'w'
        : 'e'
    )
}

export const chart = (prev, current, direction) => {
    // console.log('prev: ',prev.room_id, "cur: ", current.room_id)
    // Initial checks to stop from erroring out when this data isn't available
    if (!current.exits) {
        console.log("no room object")
        return -1
    } else if (current.room_id === prev.room_id) {
        console.log("you're not going anywhere")
        return -1
    } else if (direction === '') {
        console.log('you have no direction')
        return -1
    }

 // Check if graphMap has been added to Local Storage
    if (!localStorage.getItem('graphMap')) {

        // const graphMap = {0: {"n": {"room_id":10,"title":"A misty room","description":"You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.","coordinates":"(60,61)","elevation":0,"terrain":"NORMAL","players":[],"items":[],"exits":["n","s","w"],"cooldown":15,"errors":[],"messages":["You have walked north."]}, "s": {"room_id":2,"title":"A misty room","description":"You are standing on grass and surrounded by a dense mist. You can barely make out the exits in any direction.","coordinates":"(60,59)","elevation":0,"terrain":"NORMAL","players":[],"items":[],"exits":["n","s","e"],"cooldown":15,"errors":[],"messages":["You have walked south."]}, "e": "?", "w": "?"}}
        // const graphMap = {0: {"n": "?", "s": "?", "e": "?", "w": "?"}}
        const graphMap = {}
        localStorage.setItem('graphMap', JSON.stringify(graphMap))
        console.log("nothing in local storage")
    } 
    // Setting variables 
    const graphMap = JSON.parse(localStorage.getItem('graphMap'))
    const keys = Object.keys(graphMap)
    const strID = JSON.stringify(current.room_id)
    const preStrID = JSON.stringify(prev.room_id)

    // If you enter another room log the previous room obj to corresponding direction
    if (keys.includes(strID)) {

        const value = graphMap[strID][opDir(direction)]

        if (value === '?') {
            graphMap[current.room_id][opDir(direction)] = prev
            localStorage.setItem('graphMap', JSON.stringify(graphMap))
            console.log(`Room id:${current.room_id} added room id: ${prev.room_id} to direction ${opDir(direction)}`)
        }

        //TODO need to add this to below section when a room isn't in the graphMap yet
        if (prev.room_id !== undefined) {
        const preValue = graphMap[preStrID][direction]
            if (preValue === '?') {
                console.log("previous room direction value for this room", preValue)
                graphMap[prev.room_id][direction] = current
                if (!graphMap[prev.room_id]['self']) {
                    graphMap[prev.room_id]['self'] = prev
                }
            }
        }

    } else if (!keys.includes(strID)) {
        // current.exits()
        graphMap[current.room_id] = {}

        current.exits.map(exit => (
            graphMap[current.room_id][exit] = '?')
        )

        graphMap[current.room_id][opDir(direction)] = prev
        if (!graphMap[current.room_id]['self']) {
            graphMap[current.room_id]['self'] = current
        }
        

        localStorage.setItem('graphMap', JSON.stringify(graphMap))

        console.log("should add current object with direction obj value", current.room_id)

        if (prev.room_id !== undefined) {
            if (!keys.includes(preStrID)) {
                graphMap[prev.room_id] = {}
                prev.exits.map(exit => (
                    graphMap[prev.room_id][exit] = '?'
                ))
            }
            console.log('here!!!!!!!!!!!!!', graphMap, preStrID)
            const preValue = graphMap[preStrID][direction]
            if (preValue === '?') {
                console.log("previous room direction value for this room", preValue)
                graphMap[prev.room_id][direction] = current
                if (!graphMap[prev.room_id]['self']) {
                    graphMap[prev.room_id]['self'] = prev
                }
                localStorage.setItem('graphMap', JSON.stringify(graphMap))
            }
        }

    } else {
        console.log("Game not initialized", current.room_id, prev.room_id)
    }
}
