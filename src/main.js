const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('225262ff058832ad1921406b6a687bd047cd25a1514eeb6847b871e99e166fbc');
const myWalletAddress = myKey.getPublic('hex');

let ayushCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
ayushCoin.addTransaction(tx1);

console.log('\n Starting the miner.');
ayushCoin.minePendingTransactions(myWalletAddress);

console.log("Kumar's balance: ", ayushCoin.getBalanceOfAddress(myWalletAddress));

ayushCoin.chain[1].transactions[0].amount = 1;

console.log("Is chain valid? ", ayushCoin.isChainValid());