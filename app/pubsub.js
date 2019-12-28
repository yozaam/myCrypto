//no need os addresses, just channel
const redis = require("redis");

//console.log(redis.createClient().publish);// its require working? let me try delay

const CHANNELS = {
	TEST: 'TEST',
	BLOCKCHAIN: 'BLOCKCHAIN'
};

class PubSub{  //one class coz at one time pub is sub

	constructor( {blockchain} ) {

		this.blockchain = blockchain;

		this.publisher = redis.createClient();
		this.subscriber = redis.createClient();

		this.subscribeToChannels();

		this.subscriber.on(
			'message',
			(channel,message)=>this.handleMessage(channel,message)
		);
	}

	handleMessage(channel,message) {
			console.log(`message recieved. Channel: ${channel}. Message:${message}.`);

			const parsedMessage = JSON.parse(message);

			if(channel === CHANNELS.BLOCKCHAIN){
				this.blockchain.replaceChain(parsedMessage);
			}
	}

	subscribeToChannels(){
		Object.values(CHANNELS).forEach(channel => {
			this.subscriber.subscribe(channel);
		});
	}

	publish({ channel , message}){

		this.subscriber.unsubscribe(channel, () =>{ //why read my own message? y/n : y
			this.publisher.publish(channel, message ,()=>{
				this.subscriber.subscribe(channel);  //yayy async love callbacks
			});
		});
	}

	broadcastChain(){
		this.publish({
			channel: CHANNELS.BLOCKCHAIN,
			message: JSON.stringify(this.blockchain.chain)
		});
	}
}

module.exports = PubSub;
// const testPubSub = new PubSub();

// setTimeout(() =>testPubSub.publisher.publish(CHANNELS.TEST,'FOO'),1000);


//testPubSub.publisher.publish(CHANNELS.TEST,'FOO'); IT WAS NOT WORKING BECAUSE I WROTE constructor WITHOUT THE R AFTER T !! AHH BUGS

//redis setup to be done as an issue for contributors
//make the changes to package.json if redis must be run before starting app!
//no man lets go FOSS why don't i put some effort and use redis? #FOSSYdev

//How to use?
//‘ysv-launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
//‘ysv-redis-cli ping
//PONG

