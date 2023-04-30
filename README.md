# pob = erc1155 + sf²
PoB or proof of buidlership is an innovative system to reward contributions in a DAO of builders.

PoB should be a game changer for DAOs of builders. This protocol allow buidlers to share the profits of a project trough a customized system levearing capitalism working structures and the blockchain to secure contributors payments trough like project shares. Powered by erc1155, SuperFluid and SaFe. (pob = erc1155 + sf²)

Detailed info about PoB in this [great article by J. Valeska](https://eggplant-crowley-6f3.notion.site/pob-erc1155-sf-92cbb546e24144fa94d6805bdc62c0db), buidler of PoB.

[Video hosted on Veed.io](https://www.veed.io/view/8e1aace2-b7cd-430a-9eae-649f58c288df?panel=share)

## Frontend Setup

- Clone the repo
```
git clone https://github.com/jvaleskadevs/pob.git
```
- Change directory and install dependencies
```
cd pob/frontend && npm install
```
- Create a `.env` file
```
touch .env
```
- Add the following variables to the `.env` file
```
NEXT_PUBLIC_ALCHEMY_API_KEY=<YOUR_ALCHEMY_API_KEY>
ALCHEMY_API_KEY=<YOUR_ALCHEMY_API_KEY>
ALCHEMY_NETWORK=MATIC_MUMBAI
NEXT_PUBLIC_ALCHEMY_NETWORK=MATIC_MUMBAI
NEXT_PUBLIC_DEFAULT_CHAIN=polygonMumbaI
```
- Run the dapp:
```
npm run dev
```

This will run the dapp using previously deployed contracts, to run your own contracts you need to do the required changes in the `frontend/constants/contracts` file. Just change the addresses to your own contracts addresses.

### PoB Manager
The main dapp is the PoB Manager, you will be able to mint a PoB and get shares from the project profits. (use projectID=0 to get a n3tfl1x pob).

### N3tfl1x
Visit the page `/n3tfl1x` to get access to our N3tfl1x project sample. You will be able to create and delete a flow of fDAIx to subscribe and unsubscribe to the N3tfl1x dapp. (This is a sample, there is no a real project and you won't get any series nor films, little disclaimer)

The PoB Manager and N3tfl1x show the cash input trough N3tfl1x and output the right percentage trough the PoB showing that the system is working properly.


## Backend Setup (deploy your own contracts)

- To deploy your own contracts some changes are needed inside the `backend` folder. The `scripts/deploy` will deploy the contracts in the right order, just change the addresses to fit your own requirements. Then, just follow the classic hardhat flow. Install, setup `hardhat.config`, add `.env` file, compile and deploy.

### Distribute & Shares

The distribute function is called with every transfer, but allow specific configurations regarding mints burns or normal transfers to fit project requirements. Another option is to non call it and incentivizes DAO members to call it and get some rewards, maybe DAO tokens.

The units shares are updated with every transfer and the percentage must be constant. To achieve that is necessary to apply the right changes and setup the right units and multipliers at deployment. This is configurable for every project. A useful formula is provided as a commentary in the IDA file.



