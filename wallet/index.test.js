const Wallet = require('./index');
const Transaction = require('./transaction');
const Blockchain = require('../blockchain')
const { verifySignature} = require('../util');
const {STARTING_BALANCE} = require('../config');


describe('Wallet',()=>{
   let wallet;

   beforeEach(()=>{
       wallet = new Wallet();
    });

   it('has a `balance`',()=>{
       expect(wallet).toHaveProperty('balance');
   });

   it('has a `publicKey`',()=>{

       //console.log(wallet.publicKey);
       expect(wallet).toHaveProperty('publicKey');
   });

    describe('signing data',()=>{
        const data='foobar';

        it('verifies a signature',()=>{

            expect(
                verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature:wallet.sign(data)
                })
            ).toBe(true);

        });

        it('does not verify a bad signature',()=>{
            expect(
                verifySignature({
                    publicKey: wallet.publicKey,
                    data,
                    signature:new Wallet().sign(data)
                })
            );
        });
    });

    describe('createTransaction()',()=>{
        describe('amount exceeds balance',()=>{
           it('throws an error',()=>{
              expect(()=> wallet.createTransaction({amount:999999,recipient:'foo'}))
                  .toThrow('amount exceeds balance');
           });
        });
        describe('amount is valid',()=>{
            let transaction,amount,recipient;

            beforeEach(()=>{
                amount = 50 ;
                recipient = 'fooRecipient';
                transaction = wallet.createTransaction({amount,recipient});
            });

            it('creates an instance of `transaction`',  () =>{
                expect(transaction instanceof Transaction).toBe(true);
            });

            it('matches transaction input with the wallet itself',  () =>{
                expect(transaction.input.address).toEqual(wallet.publicKey);
            });
            it('outputs amount to recipient',  () =>{
                expect(transaction.outputMap[recipient]).toEqual(amount);
            });
        });

        describe('and the chain is passed',()=>{
            it('calls Wallet.calculateBalance',()=>{

                const originalCalculateBalance = Wallet.calculateBalance;

                const calculateBalanceMock = jest.fn();

                Wallet.calculateBalance = calculateBalanceMock;

                wallet.createTransaction({
                    recipient:'foo',
                    amount:10,
                    chain:new Blockchain().chain
                });

                expect(calculateBalanceMock).toHaveBeenCalled();
                Wallet.calculateBalance= originalCalculateBalance;
            })
        });
    });

    describe('calculateBalance()',()=>{
        let blockchain;

        beforeEach(()=>{
            blockchain = new Blockchain();
        });

        describe ('and no outputs for wallet',()=>{
            it('returns starting balance',  () =>{
                expect(
                    Wallet.calculateBalance({
                        chain:blockchain.chain,
                        address: wallet.publicKey
                    })
                ).toEqual(STARTING_BALANCE);

            });
        });

        describe ('and there are outputs for wallet',()=>{

            let transaction1,transaction2;

            beforeEach(()=>{
                transaction1 = new Wallet().createTransaction({
                    recipient:wallet.publicKey,
                    amount:50
                });

                transaction2 = new Wallet().createTransaction({
                    recipient:wallet.publicKey,
                    amount:60
                });

                blockchain.addBlock({data: [transaction1,transaction2]});
            });

            it('adds sum of all outputs to balance',  () =>{
                expect(
                    Wallet.calculateBalance({
                        chain:blockchain.chain,
                        address: wallet.publicKey
                    })
                ).toEqual(
                    STARTING_BALANCE+
                    transaction2.outputMap[wallet.publicKey]+
                    transaction1.outputMap[wallet.publicKey]
                );

            });
        });

    });
});

