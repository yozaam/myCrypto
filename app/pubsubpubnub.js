const PubNub = require('pubnub');

const credentials = {
    publishKey: 'pub-c-79532614-7180-4ebb-adf7-05a4bf6fac0d',
    subscribeKey: 'sub-c-8294b77e-354b-11ea-bbf4-c6d8f98a95a1',
    secretKey: 'sec-c-MGE4YTc5MmEtNmIzYS00MjEwLWIxMDUtMGMwY2NmYjJjNWE1'
};

const CHANNELS = {
    TEST: 'TEST',
    BLOCKCHAIN: 'BLOCKCHAIN',
    TRANSACTION: 'TRANSACTION'
};

class PubSub {
    constructor({ blockchain, transactionPool, wallet }) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;

        this.pubnub = new PubNub(credentials);

        this.pubnub.subscribe({ channels: Object.values(CHANNELS) });

        this.pubnub.addListener(this.listener());
    }

    broadcastChain() {
        this.publish({
            channel: CHANNELS.BLOCKCHAIN,
            message: JSON.stringify(this.blockchain.chain)
        });
    }

    broadcastTransaction(transaction) {
        this.publish({
            channel: CHANNELS.TRANSACTION,
            //channel:'pubnub_onboarding_channel',
            message: JSON.stringify(transaction)
        });
    }


    subscribeToChannels() {
        this.pubnub.subscribe({
            channels: [Object.values(CHANNELS)]
        });
    }

    listener() {
        return {
            message: messageObject => {
                const { channel, message } = messageObject;

                console.log(`Message received. Channel: ${channel}. Message: ${message}`);
                const parsedMessage = JSON.parse(message);

                switch(channel) {
                    case CHANNELS.BLOCKCHAIN:
                        this.blockchain.replaceChain(parsedMessage, true, () => {
                            this.transactionPool.clearBlockchainTransactions(
                                { chain: parsedMessage.chain }
                            );
                        });
                        break;
                    case CHANNELS.TRANSACTION:
                        if (!this.transactionPool.existingTransaction({
                            inputAddress: this.wallet.publicKey
                        })) {
                            this.transactionPool.setTransaction(parsedMessage);
                        }
                        break;
                    default:
                        return;
                }
            }
        }
    }

    publish({ channel, message }) {
        console.log('msg size is ',message.length)
        // there is an unsubscribe function in pubnub
        // but it doesn't have a callback that fires after success
        // therefore, redundant publishes to the same local subscriber will be accepted as noisy no-ops
        this.pubnub.publish({ message, channel }).then().catch(error => console.error(error));
    }




}

module.exports = PubSub;