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

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const isWallectConnected = async () => {
  try {
    if (!ethereum) return reportError('Please install Metamask')
    const accounts = await ethereum.request({ method: 'eth_accounts' })

    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload()
    })

    window.ethereum.on('accountsChanged', async () => {
      store.dispatch(setWallet(accounts[0]))
      await isWallectConnected()
    })

    if (accounts.length) {
      store.dispatch(setWallet(accounts[0]))
    } else {
      store.dispatch(setWallet(''))
      reportError('Please connect wallet.')
      console.log('No accounts found.')
    }
  } catch (error) {
    reportError(error)
  }
}

const getEthContract = async () => {
  const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545/')
  const wallet = new ethers.Wallet.createRandom()
  const signer = provider.getSigner(wallet.address)
  const contract = new ethers.Contract(contractAddress, contractAbi, signer)
  return contract
}


const getGiveaways = async () => {
  const contract = await getEthContract()
  const giveaways = await contract.getGiveaways()
  return structureGiveaways(giveaways);
}



const structureGiveaways = (giveaways) =>
  giveaways.map((giveaway) => ({
    id: Number(giveaway.id),
    title: giveaway.title,
    description: giveaway.description,
    owner: giveaway.owner.toLowerCase(),
    prize: fromWei(giveaway.prize),
    fee: fromWei(giveaway.fee),
    image: giveaway.image,
    createdAt: formatDate(Number(giveaway.createdAt + '000')),
    drawsAt: formatDate(Number(giveaway.expiresAt)),
    expiresAt: Number(giveaway.expiresAt),
    participants: Number(giveaway.participants),
    drawn: giveaway.drawn,
  }))

function formatDate(timestamp) {
  const date = new Date(timestamp)
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const monthsOfYear = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dayOfWeek = daysOfWeek[date.getDay()]
  const monthOfYear = monthsOfYear[date.getMonth()]
  const dayOfMonth = date.getDate()
  const year = date.getFullYear()

  return `${dayOfWeek} ${monthOfYear} ${dayOfMonth}, ${year}`
}

export {connectWallet, truncate, isWallectConnected, getGiveaways}
  