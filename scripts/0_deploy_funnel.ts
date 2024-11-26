import { Deployer, DeployFunction, Network } from '@alephium/cli'
import { Settings } from '../alephium.config'
import { Funnel } from '../artifacts/ts'

// This deploy function will be called by cli deployment tool automatically
// Note that deployment scripts should prefixed with numbers (starting from 0)
const deployFunnel: DeployFunction<Settings> = async (
  deployer: Deployer
): Promise<void> => {
  const result = await deployer.deployContract(Funnel, {
    
    
    // The initial state of the hello contract
    initialFields: {
      count: 0n,
      raffle: 0n,
      reward: 0n,
      lastrun: 0n,
      leadingentry: 0n,
      leadingamount: 0n
    }
  })
  console.log('Funnel contract id: ' + result.contractInstance.contractId)
  console.log('Funnel contract address: ' + result.contractInstance.address)
}

export default deployFunnel
