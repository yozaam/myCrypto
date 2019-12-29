const Transaction = require('./transaction');
const Wallet = require('./index');
const {verifySignature}  = require('../util');

describe('Transaction',()=>{
    let transaction,senderWallet,recipient,amount;

    beforeEach(()=>{
        senderWallet = new Wallet();
        recipient = 'recipient-public-key';
        amount = 50;

        transaction = new Transaction({senderWallet,recipient, amount});
    });

    it('has an `id`',()=>{
        expect(transaction).toHaveProperty('id');
    });

    describe('outputMap',()=>{

        it('hs an `outputMap',()=>{
           expect(transaction).toHaveProperty('outputMap');
        });

        it('outputs the amount to recipient',()=>{
           expect(transaction.outputMap[recipient]).toEqual(amount);
        });

        it('outputs the remaining balance of the `senderWallet`',()=>{
            expect(transaction.outputMap[senderWallet.publicKey]).toEqual(senderWallet.balance - amount);
        })
    });

    describe('input',()=>{


        it('has an `input`',()=>{
            expect(transaction).toHaveProperty('input');
        });

        it('has an `timestamp` in `input`',()=>{
            expect(transaction.input).toHaveProperty('timestamp');
        });

        it('sets the `amount` to the `senderWallet` balance',()=>{
            expect(transaction.input.amount).toEqual(senderWallet.balance);
        });

        it('sets `address` as sender `publicKey`',()=>{
            expect(transaction.input.address).toEqual(senderWallet.publicKey);
        });

        it('signs input',()=>{

            expect(
                verifySignature({
                    publicKey:senderWallet.publicKey,
                    data:transaction.outputMap,
                    signature:transaction.input.signature
                })
            ).toBe(true);

        });
    });
});