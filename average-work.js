//Code to check if it is better to use binary representation of hashing algo


const Blockchain = require('./blockchain');

const blockchain = new Blockchain();


blockchain.addBlock({ data : 'initial'});

console.log('FIRST BLOCK', blockchain.chain[blockchain.chain.length-1]);

let prevTimestamp,nextBlock,nextTimestamp,timeDiff, average;

const times = [];
//store diff bet prev n curr

//avg time should come towards our minerate

for( let i = 0 ; i <10000 ; i++){
	prevTimestamp = blockchain.chain[blockchain.chain.length-1].timestamp;

	blockchain.addBlock({data:`block ${i}`});
	nextBlock=blockchain.chain[blockchain.chain.length-1];

	nextTimestamp = nextBlock.timestamp;
	timeDiff = nextTimestamp - prevTimestamp;
	times.push(timeDiff);

	average = times.reduce((total,num)=> (total + num))/times.length ;

	console.log(`time to mine block ${timeDiff}ms. Difficulty: ${nextBlock.difficulty}. Average time : ${average}ms`);
}

