import { fetchInit, fetchMove, fetchStatus,fetchTake, fetchDrop, fetchPray, fetchSell, fetchMine,fetchExamine, fetchProof, fetchChangeName,fetchChart} from '../actions'

const initialState = {
    inProgress: false,
    serverError: {},
    isServerError: false,
    currentRoom: {},
    gameError: [],
    status: {},
    take: {},
    drop: {},
    pray: {},
    sell: {},
    examine: {},
    changeName: {},
    graphMap:{},
    proof: 0,
    hasMined:false
}

export const gameReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        // Initialize game cases
        case fetchInit.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchInit.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                currentRoom: payload,
                isServerError: false,
                serverError: {},
                gameError: payload.errors
            }
        case fetchInit.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        case fetchChart.pending.toString():
            return{
                ...state,
                inProgess:true,
            }
        case fetchChart.fulfilled.toString():
            return {
                ...state,
                inProgess:false,
                graphMap:JSON.parse(payload),
                isServerError:false,
                serverError:{},
                gameError:payload.errors
            }
        case fetchChart.rejected.toString():
            return {
                ...state,
                inProgess:false,
                isServerError:true,
                serverError:payload
            }
        // Moving to a room case
        case fetchMove.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchMove.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                currentRoom: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchMove.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Getting status
        case fetchStatus.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchStatus.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                status: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchStatus.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Taking things
        case fetchTake.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchTake.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                take: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchTake.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Drop something
        case fetchDrop.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchDrop.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                drop: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchDrop.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Pray
        case fetchPray.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchPray.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                pray: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchPray.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Sell
        case fetchSell.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchSell.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                sell: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchSell.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Examine
        case fetchMine.pending.toString():
            return {
                ...state,
                inProgress:true,
            }
        case fetchMine.fulfilled.toString():
            return {
                ...state,
                inProgress:false,
                mine : payload,
                isServerError:false,
                hasMined:true,
            serverError:{}            
          }
          case fetchMine.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                hasMined:false,
                serverError: payload
            }
        case fetchExamine.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchExamine.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                examine: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchExamine.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        // Change name
        case fetchChangeName.pending.toString():
            return {
                ...state,
                inProgress: true,
            }
        case fetchChangeName.fulfilled.toString():
            return {
                ...state,
                inProgress: false,
                changeName: payload,
                isServerError: false,
                serverError: {},
            }
        case fetchChangeName.rejected.toString():
            return {
                ...state,
                inProgress: false,
                isServerError: true,
                serverError: payload
            }
        case fetchProof.pending.toString():
            return {
                ...state,
                inProgress:true,
                
            }
        case fetchProof.fulfilled.toString():
            return {
                ...state,
                inProgess:false,
                proof:payload,
                isServerError:false,
             
                
            }
            case fetchProof.rejected.toString():
                return {
                    ...state,
                    inProgess:false,
                    isServerError:true,
                    serverError:payload
                    
                }

        default:
            return state
    }
}