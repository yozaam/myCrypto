//no need os addresses, just channel
const redis = require("redis");

//console.log(redis.createClient().publish);// its require working? let me try delay

const CHANNELS = {
	TEST: 'TEST'
};

class PubSub{  //one class coz at one time pub is sub

	constuctor() {
		this.publisher = redis.createClient();
		this.subscriber = redis.createClient();

		this.subscriber.subscribe(CHANNELS.TEST); //recieve all msgs on test channel

		this.subscriber.on(
			'message',
			(channel,message)=>this.handleMessage(channel,message)
		);
	}

	handleMessage(channel,message) {
			console.log(`message recieved. Channel: ${channel}. Message:${message}.`);
	}
}

const testPubSub = new PubSub();

setTimeout(() =>testPubSub.publisher.publish(CHANNELS.TEST,'FOO'),1000);

//testPubSub.publisher.publish(CHANNELS.TEST,'FOO');

//redis setup to be done as an issue for contributors
//make the changes to package.json if redis must be run before starting app!
//no man lets go FOSS why don't i put some effort and use redis? #FOSSYdev

//How to use?
//‘ysv-launchctl load ~/Library/LaunchAgents/homebrew.mxcl.redis.plist
//‘ysv-redis-cli ping
//PONG

