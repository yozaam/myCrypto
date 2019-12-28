
var redis = require("redis");
var publisher = redis.createClient();

console.log(publisher)

publisher.publish("notification", "{\"message\":\"Hello world from Asgardian!\"}", function(){
 process.exit(0);
});
