const cryptoHash = require('./crypto-hash');
const { GENESIS_DATA }  = require('./config');

class Block {
	constructor( { timestamp,lastHash,hash,data,nonce,difficulty } ){
	 	this.timestamp = timestamp;
	 	this.lastHash = lastHash;
	 	this.hash = hash;
	 	this.data = data;
	 	this.nonce = nonce;
	 	this.difficulty = difficulty;
	 }

	static genesis(){
	 	return new this(  GENESIS_DATA  );
	}

	static mineBlock({lastBlock, data}){
		let hash, timestamp;

		//const timestamp = Date.now();
		const lastHash = lastBlock.hash;
		const {difficulty} = lastBlock;
		let nonce = 0;


		do{

			nonce++;
			timestamp = Date.now();
			hash=cryptoHash(timestamp,lastHash,data,nonce,difficulty);

		} while( hash.substring(0,difficulty) !== '0'.repeat(difficulty));



		return new this({
			timestamp,
			lastHash,
			data,
			difficulty,
			nonce,
			hash
			//hash: cryptoHash(timestamp,lastHash,data,nonce,difficulty)
		});
	}

}

module.exports = Block;


// const block1 = new Block({
// 	timestamp:'01/01/01', 
// 	lastHash: 'fooLastHash',
// 	hash:'fooHash',
// 	data:'fooData'
// });

// console.log(block1);