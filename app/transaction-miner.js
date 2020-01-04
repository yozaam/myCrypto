const Transaction = require('../wallet/transaction');

class TransactionMiner {
    constructor({blockchain,transactionPool,wallet,pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub= pubsub;
    }


    mineTransactions(){
        //get the valid transactions
        const validTransactions = this.transactionPool.validTransactions();

        //generate reward transaction
        validTransactions.push(
            Transaction.rewardTransaction({minerWallet:this.wallet})
        );


        //add block to blockchain
        this.blockchain.addBlock({data:validTransactions});


        //broadcast the updated chain
        this.pubsub.broadcastChain();

        //clear the transactionPool
        this.transactionPool.clear()
    }

}

module.exports = TransactionMiner;