const Block = require('./block');
const { GENESIS_DATA } = require('./config');

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
		const mineBlock = Block.mineBlock({ lastBlock , data});

		it('returns a Block instance', ()=>{
			expect (mineBlock instanceof Block).toBe(true);
		});

		it('sets the lastHash to be hash of lastBlock', ()=>{
			expect(mineBlock.lastHash).toEqual(lastBlock.hash)
		});

		it('sets the data', ()=>{
			expect(mineBlock.data).toEqual(data);
		});
		it('sets a timestamp', ()=>{
			expect(mineBlock.timestamp).not.toEqual(undefined)
		});

	});
});