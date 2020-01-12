// const PubNub = require('pubnub')
//
const credentials={
    "publishKey":"pub-c-9e840f04-a9a2-47b0-ae35-481f9283c273",
    "subscribeKey":"sub-c-096806ba-2030-11ea-92cf-86076a99d5da",
    "secretKey":"sec-c-YTlkZTFlZjItOTQ2NC00NWRlLTliYzktYTRlOThiNmU3YjUw"
};

// const CHANNELS = {
//     TEST: 'TEST',
//     BLOCKCHAIN: 'BLOCKCHAIN',
//     TRANSACTION: 'TRANSACTION'
// };
//
//
// class PubSub{
//     constructor(){
//         this.pubnub = new PubNub(credentials);
//         this.pubnub.subscribe({channels:Object.values(CHANNELS)});
//
//         this.pubnub.addListener(this.listener());
//     }
//
//     listener(){
//         return {
//             message:messageObject =>{
//                 const {channel, message} = messageObject;
//                 console.log(`message recieved. Channel: ${channel}. Message:${message}.`);
//             }
//         };
//     }
//
//     publish({ channel , message}){
//
//         this.pubnub.publish({channel,message});
//     }
//
// }
//
const PubNub = require('pubnub');


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

    // broadcastChain() {
    //     this.publish({
    //         channel: CHANNELS.BLOCKCHAIN,
    //         message: JSON.stringify(this.blockchain.chain)
    //     });
    // }
    //
    // broadcastTransaction(transaction) {
    //     this.publish({
    //         channel: CHANNELS.TRANSACTION,
    //         message: JSON.stringify(transaction)
    //     });
    // }

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
        // there is an unsubscribe function in pubnub
        // but it doesn't have a callback that fires after success
        // therefore, redundant publishes to the same local subscriber will be accepted as noisy no-ops
        this.pubnub.publish({ message, channel });
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
            message: JSON.stringify(transaction)
        });
    }
}

module.exports = PubSub;
