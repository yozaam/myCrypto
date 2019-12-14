const Blockchain = require('./blockchain');

const Block = require('./block');


describe('Blockchain',() => {

	const blockchain = new Blockchain();

	it('contains a chain array instance',()=>{
		expect(blockchain.chain instanceof Array).toBe(true);
	});

	it('starts with genesis block',()=>{
		expect(blockchain.chain[0]).toEqual(Block.genesis());
	});

	it('adds new block to chain',()=>{
		const newData = 'foo';
		blockchain.addBlock({data: newData});

		expect(blockchain.chain[blockchain.chain.length -1].data)
			.toEqual(newData);
	});
});