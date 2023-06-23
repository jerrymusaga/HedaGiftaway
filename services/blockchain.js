import {store} from '@/store'
import {ethers} from 'ethers'
import {globalActions} from '@/store/globalSlices'
import address from '@/artifacts/contractAddress.json'
import abi from '@/artifacts/contracts/Giveaway.sol/Giveaway.json'

const {setWallet} = globalActions;
const contractAddress = address.address;
const contractAbi = abi.abi;

let tx, ethereum

if (typeof window !== 'undefined') {
    ethereum = window.ethereum
}

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)


const connectWallet = async () => {
    try {
      if (!ethereum) return reportError('Please install Metamask')
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
     
      store.dispatch(setWallet(accounts[0]))
      
    } catch (error) {
      reportError(error)
    }
}

const reportError = (error) => {
    console.log(error.message)
}


export {connectWallet}
  