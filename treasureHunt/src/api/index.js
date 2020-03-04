import axios from 'axios'
import 'dotenv'

const REACT_APP_KEY = "7a7e7d6292f5ae4f514fe8862d0ef690ebddc878"
const REACT_APP_URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv"


const axiosConfig = {
    baseURL: REACT_APP_URL
  }

const requestWithAuth = () => {
    const instance = axios.create({
        ...axiosConfig,
        headers: {Authorization: `Token 7a7e7d6292f5ae4f514fe8862d0ef690ebddc878`}
    })
    return instance
}

export const init = async () => {
    const { data } = await requestWithAuth().get("/init/")
    console.log("init: ------>", data)
    return data
}

export const move = async (dir, id) => {
    const { data } = await requestWithAuth().post("/move/", {"direction":dir, "next_room_id":id})
    console.log("move: ------>", data)
    return data
}

export const status = async () => {
    const { data } = await requestWithAuth().post("/status/")
    console.log("status ------>", data)
    return data
}

export const take = async (item) => {
    const { data } = await requestWithAuth().post("/take/", {"name":item})
    console.log("take ------>", data)
    return data
}

export const drop = async (item) => {
    const { data } = await requestWithAuth().post("/drop/", {"name":item})
    console.log("drop ------>", data)
    return data
}

export const pray = async () => {
    const { data } = await requestWithAuth().post("/pray/")
    console.log("pray ------>", data)
    return data
}

export const sell = async item => {
    const { data } = await requestWithAuth().post("/sell/", {"name":item, "confirm":"yes"})
    console.log("sell ------>", data)
    return data
}

export const examine = async name => {
    const { data } = await requestWithAuth().post("/examine/", {"name":name})
    console.log("examine ------>", data)
    return data
}

export const changeName = async name => {
    const { data } = await requestWithAuth().post("/change_name/", {"name":name, "confirm":'aye'})
    console.log("change_name ------>", data)
    return data
}

export const getProof = () => {
    axios
        .get('https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/', {headers: {Authorization: `Token ${REACT_APP_KEY}`}})
        .then(res => console.log(res))
}


export const mine = new_proof => {
    const body = {"proof": 15132323,"player":"mike_harley"}
    axios
    .post('https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/',body, {headers: {Authorization: `Token ${REACT_APP_KEY}`}})
    .then(res => console.log(res))
    .catch(err => console.log(err))
}

const proof = 15132323
mine(proof)
// getProof()


// {proof: 10039127, difficulty: 6, cooldown: 1, messages: Array(0), errors: Array(0)}
