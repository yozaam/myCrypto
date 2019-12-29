A block stores: ( block.js file )\
  timestamp\
  lastHash\
  data\
  hash\
  \
This will be designed with Test Driven Development - for confidence, reliability, speed and to learn TDD :P :) \
\
tasks completed:\
	built genesis block\
	added mining functionality\
	developed sha256 hash functionality\
\
next task:\
	~~link blocks, create blockchain ! :D~~\
	~~validate blockchain:\
		correct block fields,\
		lastHash reference previous block only! ( links ),\
		valid hash~~\
<br>
		~~chain replacement:\
		all nodes need to agree on single chain~~\
\
		~~stub console outputs~~\
		\
		~~proof of work system:\
			computation to mine\
			static difficulty~~\
		~~dynamic difficulty with nonce~~\
		~~use binary hash~~\
		~~prevent difficulty jumps~~\
		\
		build the blockchain api & network:\
		express js ? y/n : y\
		~~common methods to send data and recieve with API\   -> read the chain -> write ||~~ \
\
		~~real time msging network using pubsub channels ->blockchain  ->redis? y/n n(setup!) ->pubnob? internet? NO  ~~\
		~~yayy now duty to broadcast chain whenever adding~~ \
		\
		~~now need to sync with all new peers~~\
		~~remove redundant pubsub code to publish to one's own self~~\
\
THE BLOCKCHAIN IS READYYYY Yayy, now the crypto stuff wallets tx etc \ \
\
wallet,keys,verifying tx 1.tamper,2.spender public key crypt \
wallet\
 properties of ~~public address, balance,~~\
 \
 ~~gen signature and verify~~\
 tx outputs and map\
