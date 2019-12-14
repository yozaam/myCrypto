const Block = require('./block');
const { GENESIS_DATA } = require('./config');
const cryptoHash = require('./crypto-hash');

//using jest 
describe('Block',() => {
	const timestamp = 'fooDate';
	const lastHash = 'fooLastHash'; 
	const hash = 'fooHash';
	const data = ['myBlockchain','data'];
	const nonce = 1 ;
	const difficulty = 1;
	const block = new Block({
		timestamp,
		lastHash,
		hash,
		data,
		nonce,
		difficulty
	});
	//equivalent to 
	//  timestamp: timestamp,
	//	lastHash: lastHash,
	//	hash: hash,
	//	data : data

	//now writing my first test :D
	it('has timestamp, lastHash, hash, nonce, difficuly and data property',()=>{

		expect(block.lastHash).toEqual(lastHash);
		expect(block.hash).toEqual(hash);
		expect(block.data).toEqual(data);
		expect(block.timestamp).toEqual(timestamp);
		expect(block.nonce).toEqual(nonce);
		expect(block.difficulty).toEqual(difficulty);


	});

	//describe inside this for genesis
	describe('genesis()', () => {
		const genesisBlock = Block.genesis();

		//console.log('genesisBlock',genesisBlock);

		it('returns a Block instance', () => {
			expect (genesisBlock instanceof Block).toBe(true);
		});

		it('returns genesis data', () =>{
			expect( genesisBlock).toEqual(GENESIS_DATA);
		});
	});

	describe('mineBlock()', ()=>{
		const lastBlock = Block.genesis();
		const data = 'mined';
		const minedBlock = Block.mineBlock({ lastBlock , data});

		it('returns a Block instance', ()=>{
			expect (minedBlock instanceof Block).toBe(true);
		});

		it('sets the lastHash to be hash of lastBlock', ()=>{
			expect(minedBlock.lastHash).toEqual(lastBlock.hash)
		});

		it('sets the data', ()=>{
			expect(minedBlock.data).toEqual(data);
		});

		it('sets a timestamp', ()=>{
			expect(minedBlock.timestamp).not.toEqual(undefined)
		});

		it('generates SHA-256 hash based on proper inputs',()=>{

			expect(minedBlock.hash)
			  .toEqual(
			  	cryptoHash(
				  	minedBlock.timestamp, 
				  	minedBlock.difficulty,
				  	minedBlock.nonce,
				  	lastBlock.hash,
				  	data
			  	)
			);
	
		});

		it('sets a hash that matches the difficuly criteria',()=>{
			expect(minedBlock.hash.substring(0,minedBlock.difficulty))
				.toEqual('0'.repeat(minedBlock.difficulty));
		});

	});
});