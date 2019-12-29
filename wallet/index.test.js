const Wallet = require('./index');

describe('Wallet',()=>{
   let wallet;

   beforeEach(()=>{
       wallet = new Wallet();
    });

   it('has a `balance`',()=>{
       expect(wallet).toHaveProperty('balance');
   });

   it('has a `publicKey`',()=>{

       console.log(wallet.publicKey)
       expect(wallet).toHaveProperty('publicKey');
   });
});