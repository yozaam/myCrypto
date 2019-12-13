const Block = require('./block');

//using jest 
describe('Block',() => {
	const timestamp = 'fooDate';
	const lastHash = 'fooLastHash'; 
	const hash = 'fooHash';
	const data = ['myBlockchain','data'];
	const block = new Block({
		timestamp,
		lastHash,
		hash,
		data 
	});
	//equivalent to 
	//  timestamp: timestamp,
	//	lastHash: lastHash,
	//	hash: hash,
	//	data : data

	//now writing my first test :D
	it('has timestamp, lastHash, hash and data property',()=>{
		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
		expect(block.timestamp).toEqual(timestamp);

	});

});