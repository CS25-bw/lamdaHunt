
# Paste your version of blockchain.py from the basic_block_gp
# folder here
import hashlib
import json
from time import time
from uuid import uuid4
from flask import Flask, jsonify, request
class Blockchain(object):
    def __init__(self):
        self.chain = []
        self.current_transactions = []
        # Create the genesis block
        self.new_block(previous_hash=1, proof=100)
    def new_block(self, proof, previous_hash=None):
        """
        Create a new Block in the Blockchain
        A block should have:
        * Index
        * Timestamp
        * List of current transactions
        * The proof used to mine this block
        * The hash of the previous block
        :param proof: <int> The proof given by the Proof of Work algorithm
        :param previous_hash: (Optional) <str> Hash of previous Block
        :return: <dict> New Block
        """
        block = {
            'index': len(self.chain) + 1,
            'timestamp': time(),
            'transactions': self.current_transactions,
            'proof': proof,
            'previous_hash': previous_hash
        }
        # Reset the current list of transactions
        self.current_transactions = []
        # Append the chain to the block
        self.chain.append(block)
        # Return the new block
        return block
    def hash(self, block):
        """
        Creates a SHA-256 hash of a Block
        :param block": <dict> Block
        "return": <str>
        """
        # Use json.dumps to convert json into a string
        # Use hashlib.sha256 to create a hash
        # It requires a `bytes-like` object, which is what
        # .encode() does.
        # It convertes the string to bytes.
        # We must make sure that the Dictionary is Ordered,
        # or we'll have inconsistent hashes
        # TODO: Create the block_string
        string_object = json.dumps(block, sort_keys=True).encode()
        # TODO: Hash this string using sha256
        raw_hash = hashlib.sha256(string_object)
        hex_hash = raw_hash.hexdigest()
        # By itself, the sha256 function returns the hash in a raw string
        # that will likely include escaped characters.
        # This can be hard to read, but .hexdigest() converts the
        # hash to a string of hexadecimal characters, which is
        # easier to work with and understand
        # TODO: Return the hashed block string in hexadecimal format
        return hex_hash
    @property
    def last_block(self):
        return self.chain[-1]

    @staticmethod
    def valid_proof(block_string, proof):
        """
        Validates the Proof:  Does hash(block_string, proof) contain 3
        leading zeroes?  Return true if the proof is valid
        :param block_string: <string> The stringified block to use to
        check in combination with `proof`
        :param proof: <int?> The value that when combined with the
        stringified previous block results in a hash that has the
        correct number of leading zeroes.
        :return: True if the resulting hash is a valid proof, False otherwise
        """
        guess = f"{block_string}{proof}".encode()
        guess_hash = hashlib.sha256(guess).hexdigest()
        return guess_hash[:6] == "000000"
# Instantiate our Node
app = Flask(__name__)
# Generate a globally unique address for this node
node_identifier = str(uuid4()).replace('-', '')
# Instantiate the Blockchain
blockchain = Blockchain()
@app.route('/mine', methods=['POST'])
def mine():
    # Run the proof of work algorithm to get the next proof
    # proof = blockchain.proof_of_work(blockchain.last_block)
    # Forge the new Block by adding it to the chain with the proof
    # previous_hash = blockchain.hash(blockchain.last_block)
    # block = blockchain.new_block(proof, previous_hash)

    #Acquire the POST request
    data = request.get_json()
    #Check for id and proof sent
    if data['proof'] is None and data['id'] is None:
        return jsonify({'message':"You didn't send the proof or id with your request"}),400

    #Check for proof
    #Acquire the string 
    block_string = json.dumps(blockchain.last_block, sort_keys=True)

    #Now perform validation on the proof sent
    valid_proof = blockchain.valid_proof(block_string,data['proof'])

    #Set up responses for True or False for validating proof
    if valid_proof:
        #When true for proof, create new block
        last_block = blockchain.last_block
        #Find previous hash of the last block
        previous_hash = blockchain.hash(last_block)

        #generate new block using previous hash
        new_block = blockchain.new_block(data['proof'],previous_hash)

        #Send new block as response
        response = {
            'message':"New Block Forged",
            'index':new_block['index'],
            'timestamp':new_block['timestamp'],
            'transaction':new_block['transactions'],
            'proof':new_block['proof'],
            'previous_hash':new_block['previous_hash']
        }
        return jsonify(response),200
    else:
        return jsonify({'message':"Proof is NOT true"}),400
@app.route('/chain', methods=['GET'])
def full_chain():
    response = {
        # TODO: Return the chain and its current length
        'length': len(blockchain.chain),
        'chain': blockchain.chain
    }
    return jsonify(response), 200
@app.route('/last_block', methods=['GET'])
def last_block():
    response = {
        'last_block':blockchain.last_block
    }
    return jsonify(response),200
# Run the program on port 5000
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)