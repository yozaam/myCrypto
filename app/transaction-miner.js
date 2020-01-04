class TransactionMiner {
    constructor({blockchain,transactionPool,wallet,pubsub}){
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.pubsub= pubsub;
    }


    mineTransactions(){
        //get the valid transactions

        //generate reward transaction

        //add block to blockchain


        //broadcast the updated chain

        //clear the transactionPool
    }

}

module.exports = TransactionMiner;