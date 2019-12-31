const cryptoHash = require('./crypto-hash');

describe('cryptoHash()',()=>{
	it('generates SHA-256 hashed output',()=>{

		expect(cryptoHash('bar'))
		  .toEqual("4c293ff010a730f0972761331d1b5678478d425c2dc5cefd16d8f20059e497f3")
	
	});

	it('produces same hash with the same input in any order',()=>{
		
		expect(cryptoHash('one','two','three'))
		  .toEqual(cryptoHash('three','one','two'));

	});

    it('produces unique hash when properties of an object change',()=> {
    	const foo = {};
    	const originalHash = cryptoHash(foo);

    	foo['a'] = 'a';

    	expect(cryptoHash(foo)).not.toEqual(originalHash)
    });
});