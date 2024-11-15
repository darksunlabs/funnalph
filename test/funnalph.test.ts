import { web3, addressFromContractId } from '@alephium/web3'
import { randomContractId, testAddress } from '@alephium/web3-test'
import { Funnel, FunnelTypes } from '../artifacts/ts'

describe('unit tests', () => {
	it('blank test', () => {
	
	console.log('just checks if the execution flow is behaving correctly');
	}),
  it('Adds a New Entry', async () => {

    // Use the correct host and port
    web3.setCurrentNodeProvider('http://127.0.0.1:22973')

    const testContractId = randomContractId()
    const testParams = {
      // a random address that the test contract resides in the tests
      address: addressFromContractId(testContractId),
      // assets owned by the test contract before a test
      initialAsset: { alphAmount: 10n ** 18n, tokens: [{ id: testContractId, amount: 10n }] },
      // initial state of the test contract
      initialFields: {
        count: 0n
      },
      // arguments to test the target function of the test contract
      testArgs: { amt: 2n, to: '18PtRKysjGKNQJijidydDH6bmJeks2YaaLr8KhMdacAnW', ag: '14cLiRion2B2H1aFBbyPraNvWz1SUufiU2cgmWiqBNyAY' },
      // assets owned by the caller of the function
      inputAssets: [{ address: testAddress, asset: { alphAmount: 10n ** 18n } }]
    }

    const testResult = await Funnel.tests.createEntry(testParams)
    
    const contractState0 = testResult.contracts[0] as FunnelTypes.State
    expect(contractState0.fields.count).toEqual(1n)
    //console.log(contractState0.mappings.entries[1n])
  })
  
})
