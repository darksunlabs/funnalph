import { Deployments } from '@alephium/cli'
import { DUST_AMOUNT, web3, NodeProvider, ONE_ALPH } from '@alephium/web3'
import { PrivateKeyWallet} from '@alephium/web3-wallet'
import configuration from '../alephium.config'
import { Funnel } from '../artifacts/ts'

async function display_count() {
  console.log('init display')
  //Select our network defined in alephium.config.ts
  const network = configuration.networks.testnet

  //NodeProvider is an abstraction of a connection to the Alephium network
  // wallet-v20 is one of the only working links right now for the testnet so let's leave it at that
  const nodeProvider = new NodeProvider('https://wallet-v20.testnet.alephium.org')

  //Sometimes, it's convenient to setup a global NodeProvider for your project:
  web3.setCurrentNodeProvider(nodeProvider)

  //Connect our wallet, typically in a real application you would connect your web-extension or desktop wallet
  const key: string = (process.env.PK as string) || "no key found";
  const wallet = new PrivateKeyWallet({privateKey: key })

  //.deployments contains the info of our `CounterRalph` deployement, as we need to now the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_hello.ts`
  const deployments = await Deployments.load(configuration, 'testnet')
	console.log(deployments)
  //Make sure it match your address group
  const accountGroup = 3

  const deployed = deployments.getDeployedContractResult(accountGroup, 'Funnel')

  if(deployed !== undefined) {
    const funnelContractId = deployed.contractInstance.contractId
    const funnelContractAddress = deployed.contractInstance.address
    console.log(funnelContractAddress)
    console.log("bye")

    
    // Fetch the latest state of the token contract, `mut counter` should have change
    const funnel = Funnel.at(funnelContractAddress)
    const state = await funnel.fetchState()
    console.log(state.fields.count)

   
    console.log("au revoir")
  } else {
    console.log('`deployed` is undefined')
  }
}


async function new_entry() {
	console.log('init new entry');
  //Select our network defined in alephium.config.ts
  const network = configuration.networks.testnet

  //NodeProvider is an abstraction of a connection to the Alephium network
  const nodeProvider = new NodeProvider('https://wallet-v20.testnet.alephium.org')

  //Sometimes, it's convenient to setup a global NodeProvider for your project:
  web3.setCurrentNodeProvider(nodeProvider)

  //Connect our wallet, typically in a real application you would connect your web-extension or desktop wallet
  const key: string = (process.env.PK as string) || "no key found";
  const wallet = new PrivateKeyWallet({privateKey: key, nodeProvider})

  //.deployments contains the info of our `TokenFaucet` deployement, as we need to now the contractId and address
  //This was auto-generated with the `cli deploy` of our `scripts/0_deploy_faucet.ts`
  const deployments = await Deployments.load(configuration, 'testnet')
	
  //Make sure it match your address group
  const accountGroup = 3

  const deployed = deployments.getDeployedContractResult(accountGroup, 'Funnel')

  if(deployed !== undefined) {
    const funnelContractId = deployed.contractInstance.contractId
    const funnelContractAddress = deployed.contractInstance.address

    const funnel = Funnel.at(funnelContractAddress)
    await funnel.transact.createEntry({
    	signer: wallet,
   	args: { amt: 2n, to: '1KMwDH1yqkK51jLBmWWAS5NwbLa59sEoyhanTtXRwgUU', ag: '1KMwDH1yqkK51jLBmWWAS5NwbLa59sEoyhanTtXRwgUU',},
   	attoAlphAmount:  2n * ONE_ALPH + DUST_AMOUNT
   })
	//100000000000000000
	//1000000000000000
   
    console.log("au revoir 2")
  } else {
    console.log('`deployed` is undefined')
  }
}



// Let's perform one operation at a time while commenting the others out
display_count()
//new_entry()

