import hashlib
import sys
from uuid import uuid4
from timeit import default_timer as timer
import random
import json
from flask import Flask, jsonify, request
from flask_cors import CORS,cross_origin

app = Flask(__name__)
@app.route('/proof',methods=['POST'])
@cross_origin()
def proof_of_work():
    """
    Multi-Ouroboros of Work Algorithm
    - Find a number p' such that the last six digits of hash(p) are equal
    to the first six digits of hash(p')
    - IE:  last_hash: ...AE9123456, new hash 123456888...
    - p is the previous proof, and p' is the new proof
    - Use the same method to generate SHA-256 hashes as the examples in class
    - Note:  We are adding the hash of the last proof to a number/nonce for the new proof
    """
    data = request.get_json()
    print(data)
    if data['last_proof'] is None:
        return jsonify({'message':"You didn't send the proof"})
    
    start = timer()
    
    print("Searching for next proof")
    proof = 0
    #  TODO: Your code here
    while not valid_proof(data, proof):
        proof += 1
    #guess = f'{proof}'.encode()
    #guess_hash = hashlib.sha256(guess).hexdigest()
    print("Proof found: " + str(proof) + " in " + str(timer() - start))
    response = {
       "message":"Proof Found",
       "proof":proof,
       "time":timer() - start,
       "last_proof":data
    }
    return jsonify(response),200

def valid_proof(last_proof, proof):
    """
    Validates the Proof:  Multi-ouroborus:  Do the last six characters of
    the hash of the last proof match the first six characters of the proof?
    IE:  last_hash: ...AE9123456, new hash 123456888...
    """
    guess = f'{last_proof}{proof}'.encode()
    guess_hash = hashlib.sha256(guess).hexdigest()
    # previous_hash = f'{last_hash}'.encode()
    # last = hashlib.sha256(previous_hash).hexdigest()
    # print("whole guess_hash: ", guess_hash)
    # print("guess_hash: ", guess_hash[:6])
    # print("whole last_hash", f'{last_hash}'.encode())
    # print("last_hash", f'{last_hash}'.encode()[-6:])
    # print("last_hash", last[-6:])
    return guess_hash[:6] == '000000'
# last_proof = 1038335186
# proof_of_work(last_proof)
# test = [1,2,3,4,5,6,7]
# print(test[:6])
if __name__ == '__main__':
    app.run(host='localhost',port=5000,debug=True)