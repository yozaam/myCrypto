const uuid = require('uuid/v1');
const {verifySignature} = require('../util');
const {REWARD_INPUT, MINING_REWARD} = require('../config');

class Transaction{
    constructor({senderWallet,recipient,amount,outputMap,input}){

        this.id = uuid();
        this.outputMap = outputMap || this.createOutputMap({senderWallet,recipient,amount});
        this.input = input || this.createInput({senderWallet, outputMap:this.outputMap});
    }

    createOutputMap({senderWallet, recipient,amount}){
        const outputMap = {};

        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey]=senderWallet.balance-amount;

        return outputMap;
    };

    createInput({senderWallet, outputMap}){
        return {
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature:senderWallet.sign(outputMap)
        };
    }

    static validTransaction(transaction){

        const { input:{address,amount,signature} , outputMap} = transaction;

        // I am wondering, what if i have 50 input giving 5 to A and 45 to B how do i verify that nobody changed it to 49 to A and 1 to B, wait let me understand if this is already checked by hash
        const outputTotal = Object.values(outputMap)
            .reduce((total, output)=>total + output);

        if(amount!==outputTotal){
            console.error(`invalid transaction from ${address}`);
            return false;
        }

        if(!verifySignature({publicKey:address, data:outputMap , signature})){
            console.error(`invalid signature from ${address}`);
            return false;
        }

        return true;
    }

    static rewardTransaction({minerWallet}){
        return new this({
            input: REWARD_INPUT,
            outputMap:{[minerWallet.publicKey]:MINING_REWARD}
        });
    }


    update({senderWallet,recipient,amount}){

        if(amount>this.outputMap[senderWallet.publicKey]){
            throw new Error('amount exceeds balance');
        }

        if(!this.outputMap[recipient]){
            this.outputMap[recipient] = amount;
        }else{
            this.outputMap[recipient] = this.outputMap[recipient] + amount;
        }

        this.outputMap[senderWallet.publicKey] =
            this.outputMap[senderWallet.publicKey] - amount;

        this.input = this.createInput({senderWallet,outputMap:this.outputMap});
    }
}

module.exports =Transaction;