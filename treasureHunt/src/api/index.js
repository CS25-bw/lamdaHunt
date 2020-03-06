require('dotenv').config()
const axios = require('axios')
const {proof_of_work} = require('./Proof')
const { Chart } = require('../chart/index')
const datas = require('../mapped_four.json')



 const REACT_APP_KEY = process.env.REACT_APP_KEY
const REACT_APP_URL = process.env.REACT_APP_URL


const axiosConfig = {
    baseURL: REACT_APP_URL
  }

const requestWithAuth = () => {
    const instance = axios.create({
        ...axiosConfig,
        headers: {Authorization: `Token ${REACT_APP_KEY}`}
    })
    return instance
}

export const init = async () => {
    const { data } = await requestWithAuth().get("/init/")
    console.log("init: ------>", data)
    return data
}
export const chart = async () => {
    
    let charts = await localStorage.getItem('graphMap');
    console.log("chart:--------->", charts);
    if(charts === null || charts === undefined){
      localStorage.setItem("graphMap",JSON.stringify(datas))
       console.log("LocalStorage Updated")
       
    }
    const { data } = localStorage.getItem("graphMap")

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

export const getProof = async () => {
    console.log("GETTING PROOF..............")
  const response =
  await  axios
        .get('https://lambda-treasure-hunt.herokuapp.com/api/bc/last_proof/', {headers: {Authorization: `Token ${REACT_APP_KEY}`}})
          const proof = {"last_proof":response.data.proof}  
        
       
    
    const request = await axios.post('http://localhost:5000/proof',proof,{headers:{'ACCESS-CONTROL-ALLOW-ORIGIN':'*'}})
    await localStorage.setItem('last_proof',request.data.last_proof.last_proof)
   await  console.log("PROOF ----------->",request.data)
    await mine();    
}


export const mine =  () => {
  
    
   
   const last = localStorage.getItem('last_proof')
    const last_proof = parseInt(last)
      
    const body = {"proof":last_proof,"player":"mike_harley"}
    axios
    .post('https://lambda-treasure-hunt.herokuapp.com/api/bc/mine/',body, {headers: {Authorization: `Token ${REACT_APP_KEY}`}
            })
    .then(res => console.log(res))
    .catch(err => console.log(err))

}


// blockstack.createNewBlock = function(nonce, last_proof, hash) {
// 	const newBlock = {
// 		index: this.chain.length + 1,
// 		timestamp: Date.now(),
// 		transactions: this.pendingTransactions,
// 		nonce: nonce,
// 		hash: hash,
// 		previousBlockHash: last_proof
// 	};

// 	this.pendingTransactions = [];
// 	this.chain.push(newBlock);

// 	return newBlock;
// };
// blockstack.hashBlock = function(previousBlockHash, currentBlockData, nonce) {
// 	const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
// 	const hash = sha256(dataAsString);
// 	return hash;
// };




	

// {proof: 10039127, difficulty: 6, cooldown: 1, messages: Array(0), errors: Array(0)}
