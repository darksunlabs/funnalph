import { Configuration } from '@alephium/cli'
import * as dotenv from 'dotenv'
dotenv.config()

export type Settings = {}


const key: string = (process.env.PK as string);
console.log(key);

const configuration: Configuration<Settings> = {
  networks: {
    devnet: {
      //Make sure the two values match what's in your devnet configuration
      nodeUrl: 'http://localhost:22973',
      networkId: 4,
	privateKeys: 'a642942e67258589cd2b1822c631506632db5a12aabcf413604e785300d762a5',
	settings: {}
    },
    testnet: {
      nodeUrl: process.env.NODE_URL as string ?? 'https://wallet-v20.testnet.alephium.org',
      privateKeys: process.env.PK === undefined ? [] : process.env.PK.split(','),
      settings: {}

    },
    mainnet: {
      nodeUrl: '',
      privateKeys: [],
      settings: {}
    }
  }
}

export default configuration
