require('@nomicfoundation/hardhat-toolbox');
require('dotenv').config();

const GAS_LIMIT = 10000000;

module.exports = {
	solidity: {
		version: "0.8.14",
		settings: {
			optimizer: {
				enabled: true
			}
		}
	},
	allowUnlimitedContractSize: true,
	networks: {
		hardhat: {},
		MATIC_MAINNET: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
		},
		MATIC_MUMBAI: {
			accounts: [`${process.env.PRIVATE_KEY}`],
			url: `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
			gas: GAS_LIMIT
		}
	},
	etherscan: {
		apiKey: `${process.env.ETHERSCAN_API_KEY}`
	}
}
