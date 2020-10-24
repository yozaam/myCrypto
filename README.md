## all done Yay :D => keeping this checklist as a memory of my biggest project, feel free to go through it to build your own ;)

## it is ready, check it out at : 
https://whispering-cliffs-93405.herokuapp.com/

and a peer is running at :) : 
https://thawing-bayou-82976.herokuapp.com/

## Some Screenshots :)
### I learnt TDD and Node.js only through this project:)

<img width="1224" alt="Screenshot 2020-06-30 at 12 23 54 AM" src="https://user-images.githubusercontent.com/20089340/86045038-a07af800-ba68-11ea-93da-87348e5b5429.png">

<img width="1132" alt="Screenshot 2020-06-30 at 12 24 25 AM" src="https://user-images.githubusercontent.com/20089340/86045015-9822bd00-ba68-11ea-99d0-dc7b7c62b1c1.png">

<img width="712" alt="Screenshot 2020-06-30 at 12 24 33 AM" src="https://user-images.githubusercontent.com/20089340/86044992-8f31eb80-ba68-11ea-9231-baafd0f3d0dd.png">


<img width="336" alt="Screenshot 2020-06-30 at 12 24 48 AM" src="https://user-images.githubusercontent.com/20089340/86044978-8b05ce00-ba68-11ea-82d3-f79ce576eb59.png">



## My Journey & Checklist



Now i must add a file system persistent storage of the chain


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

keeping this below the readme as it is the roadmap I followed :D
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
~~block explorer \
react and parcel setup\
build components\
blockchain frontend~~\
~~cyptocurrency frontend\
blocks & wallet separate\
transaction pool\
mine~~\
MVP readyyy!!\
Issue :dev-peer is considering invalid for dev blockchain(mayber coz diff wallets, need to add import wallet also)\\\
//yes its the different wallets, testing some soln ideas now
