const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = '';
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "01/01/2020", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for(let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if(currentBlock.hash != currentBlock.calculateHash()) {
                return false;
            }

            if(currentBlock.previousHash != previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let ayushCoin = new Blockchain();
ayushCoin.addBlock(new Block(1, "11/06/2020", { amount: 4 }));
ayushCoin.addBlock(new Block(2, "13/06/2020", { amount: 10 }));

console.log("Is Blockchain Valid? ", ayushCoin.isChainValid());

ayushCoin.chain[1].data = { amount: 100 };
ayushCoin.chain[1].hash = ayushCoin.chain[1].calculateHash();
console.log("Is Blockchain Valid? ", ayushCoin.isChainValid());

//console.log(JSON.stringify(ayushCoin, null, 4));