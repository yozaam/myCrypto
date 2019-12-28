const Blockchain = require('./index');
const cryptoHash = require('../util/crypto-hash');

const Block = require('./block');


describe('Blockchain',() => {

	let blockchain, newChain,originalChain;

	beforeEach(()=>{
		blockchain = new Blockchain();
		newChain = new Blockchain();

		originalChain = blockchain.chain;

	});

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

	describe('isValidChain()',() => {

		describe('when the chain doesnt start with genesisblock',()=>{
			it('returns false',()=>{
				blockchain.chain[0] = {  data: 'fake-genesis' };

				expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
			});
		});

		describe('when the chain starts with genesisblock and has multiple blocks',()=>{
			
			beforeEach(()=>{
					blockchain.addBlock({ data : 'cow'});
					blockchain.addBlock({ data : 'goat'});
					blockchain.addBlock({ data : 'tiger'});
			});

			describe('and a lastHash reference has changed',()=>{
				it('returns false',()=>{
					

					blockchain.chain[2].lastHash = 'broken-lastHash';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);


				});
			});

			describe('and chain contains a block with an invalid field',()=>{
				it('returns false',()=>{
					

					blockchain.chain[2].data = 'broken-data';

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);

				});
			});

			describe('and the chain has jumped difficulty',()=>{
				it('returns false',()=>{

					const lastBlock = blockchain.chain[blockchain.chain.length-1];
					const lastHash = lastBlock.hash;
					const timestamp = Date.now();
					const nonce = 0;
					const data = [];
					const difficulty = lastBlock.difficulty -3;

					const hash = cryptoHash(timestamp,data,nonce,lastHash,difficulty);

					const badBlock = new Block({
					  timestamp,lastHash, hash,nonce,data,difficulty
					});

					blockchain.chain.push(badBlock);

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
				});
			});

			describe('and chain contains (no invalid) all valid blocks',()=>{
				it('returns true',()=>{
					

					expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);

				});
			});

		});

	});

	describe('replaceChain()',()=>{

		let errorMock,logMock;

		beforeEach(()=>{
			errorMock = jest.fn();
			logMock = jest.fn();

			global.console.error = errorMock;
			global.console.log = logMock;
		});

		describe('when new chain is not longer' ,()=>{

			beforeEach(()=>{

				newChain.chain[0] = {new: 'chain'};

				blockchain.replaceChain(newChain.chain);

			});

			it('does not replace the chain',()=>{

				expect(blockchain.chain).toEqual(originalChain);
			});

			it('logs an error' , ()=> {
				expect(errorMock).toHaveBeenCalled();
			});
		});

		describe('when new chain is longer', ()=>{

			beforeEach(()=>{
					newChain.addBlock({ data : 'cow'});
					newChain.addBlock({ data : 'goat'});
					newChain.addBlock({ data : 'tiger'});
			});

			describe('and the chain is invalid', ()=>{

				beforeEach(()=>{
					newChain.chain[2].hash = 'fake-hash';

					blockchain.replaceChain(newChain.chain);
				});


				it('does not replace the chain',()=>{
					expect(blockchain.chain).toEqual(originalChain);
				});

				it('logs an error' , ()=> {
					expect(errorMock).toHaveBeenCalled();
				});
			});


			describe('and chain is valid', ()=>{


				beforeEach(()=>{

					blockchain.replaceChain(newChain.chain);

				});


				it('replaces the chain',()=>{
					expect(blockchain.chain).toEqual(newChain.chain);

				});

				it('logs about chain replacement', ()=>{
					expect(logMock).toHaveBeenCalled();
				});
			});
		});

	});
});