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
 ~~tx outputs and outputMap~~\
 ~~inputs for a transaction~~\
 ~~verify signatures~~, ~~validate entire transaction-> outputMap + signature~~\
 ~~add the ability to create transaction to wallet so we can access the wallet local state~~\
 ~~allow multiple outputs~~ \
 ~~WAIT js is going to give same hash for all the outputMap object everytime because objects hash is same even when changing the data! 
lol just stringify~~\
\
~~transaction edge cases, same recipient and all~~\
~~transaction pooooollllll~~\
~~endpoint for transaction pool+handle invalid~~\
~~broadcast,handle transactions\
sync on connect~~\
~~put the transactions into the blocks+reward miner\
->get data from pool->if valid tx...\
clear pool if added~~\
~~wallet checks balance~~\
~~check balance before each transaction~~\ 
~~only sum from recent!~~\
~~validate the data! in the block thus validate tx blocks\
format of tx ie IO->only one reward->input acc to balance-> no identical tx~~\
BACKEND COMPLETE!\
front end \
block explorer \
react and parcel setup\
build components\