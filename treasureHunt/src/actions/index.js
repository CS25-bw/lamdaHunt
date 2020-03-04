import { createAsyncAction } from 'redux-promise-middleware-actions'

import { init, move, status, take, drop, pray, sell, examine, mine ,changeName } from '../api'

export const fetchInit = createAsyncAction("FETCH_INIT", init)

export const fetchMove = createAsyncAction("FETCH_MOVE", move)
export const fetchMine = createAsyncAction("FETCH_MINE",  mine)

export const fetchStatus = createAsyncAction("FETCH_STATUS", status)

export const fetchTake = createAsyncAction("FETCH_TAKE", take)

export const fetchDrop = createAsyncAction("FETCH_DROP", drop)

export const fetchPray = createAsyncAction("FETCH_PRAY", pray)

export const fetchSell = createAsyncAction("FETCH_PRAY", sell)

export const fetchExamine = createAsyncAction("FETCH_EXAMINE", examine)

export const fetchChangeName= createAsyncAction("FETCH_CHANGE_NAME", changeName)

