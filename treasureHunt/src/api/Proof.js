
import { sha256 } from 'js-sha256';

let DIFFICULTY = 6
export function proof_of_work(last_proof) {
  let proof = 50000
  console.log("Searching for proof")

   
    while (valid_proof(last_proof,proof)){
         proof += 1
         
         console.log("Proof found:" + JSON.stringify(proof) + "in" + JSON.stringify(proof) )
                    return proof
                  };
                }        
export function valid_proof(last_proof,proof){
      
       let guess = btoa(last_proof,proof)
      let guess_hash = sha256.hex(guess)
        return JSON.stringify(guess_hash[DIFFICULTY] === DIFFICULTY * 0)
  }
      

