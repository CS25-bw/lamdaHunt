
import { sha256 } from 'js-sha256';

let DIFFICULTY = 6
export function proof_of_work(last_proof) {
  let proof = 50000


   
    while (valid_proof(last_proof,proof)){
         console.log(proof += 1)
         
         console.log("Proof found:" + JSON.stringify(proof) + "in" + JSON.stringify(proof) )
                    
                  };
                  return proof
             
 function valid_proof(last_proof,proof){
      
       let guess1 = btoa(last_proof)
       let guess2 =  btoa(proof)
      let guess_hash = sha256.hex(guess1,guess2)
       proof = guess_hash
        return proof[DIFFICULTY] === DIFFICULTY * 0
  }
      
}
