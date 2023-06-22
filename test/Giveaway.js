const {expect} = require('chai');
const {faker} = require('@faker-js/faker');
const {ethers} = require('hardhat');

const toWei = (num) => ethers.utils.parseEther(num.toString())
const fromWei = (num) => ethers.utils.formatEther(num)

const addDays = (days) => {
    const currentDate = new Date()
    const millisecondsPerDay = 24 * 60 * 60 * 1000
    const newTimestamp = currentDate.getTime() + days * millisecondsPerDay
    return newTimestamp
}

const generateLuckyNumbers = (count) => {
    const result = []
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    for (let i = 0; i < count; i++) {
      let string = ''
      for (let j = 0; j < 6; j++) {
        string += characters.charAt(Math.floor(Math.random() * charactersLength))
      }
      result.push(string)
    }
    return result
}


describe('Giveaway', () => {
    let ContractFactory, contract, result;
    const servicePercent = 2;
    const title = faker.random.words(5)
    const description = faker.lorem.paragraph()
    const image = faker.image.imageUrl()
    const fee = toWei(0.01)
    const prize = toWei(10)
    const expiresAt = addDays(7)
    const giveawayId = 1
    const numberOfWinners = 2
    const numberToGenerate = 5
    beforeEach(async () => {
        ContractFactory = await ethers.getContractFactory('Giveaway');
        [platformAccount, participant1, participant2, participant3, participant4, participant5] = await ethers.getSigners();
        contract = await ContractFactory.deploy(servicePercent);
        const txn = await contract.deployTransaction.wait();
        console.log(`contract Address: ${txn.contractAddress}`)
    })

    describe('Deployed State', () => {
        it('Should confirm deployment information', async () => {
          result = await contract.owner()
          console.log(result)
          expect(result).to.be.equal(platformAccount.address)
          result = await contract.servicePercent()
          expect(result.toNumber()).to.be.equal(servicePercent)
        })
    })

    describe('Giveaway Creation', () => {
        it('Should confirm giveaway creation', async () => {
          result = await contract.getGiveaways();
          expect(result).to.have.lengthOf(0);
    
          await contract.createGiveaway(title, description, image, prize, fee, expiresAt)
    
          result = await contract.getGiveaways()
          expect(result).to.have.lengthOf(1)
        })
    })

    describe('Lucky Numbers Generation', () => {
        beforeEach(async () => {
          await contract.createGiveaway(title, description, image, prize, fee, expiresAt)
        })
    
        it('Should confirm lucky numbers import', async () => {
          result = await contract.getGiveawayLuckyNumbers(giveawayId)
          expect(result).to.have.lengthOf(0)
    
          await contract.importLuckyNumbers(giveawayId, generateLuckyNumbers(numberToGenerate))
    
          result = await contract.getGiveawayLuckyNumbers(giveawayId)
          expect(result).to.have.lengthOf(numberToGenerate)
        })
    })

    describe('Buying Giveaway Tickets', () => {
        beforeEach(async () => {
          await contract.createGiveaway(title, description, image, prize, fee, expiresAt)
          await contract.importLuckyNumbers(giveawayId, generateLuckyNumbers(numberToGenerate))
        })
    
        it('Should confirm ticket purchase', async () => {
          result = await contract.getGiveaway(giveawayId)
          expect(result.participants.toNumber()).to.be.equal(0)
          result = await contract.getGiveawayParticipants(giveawayId)
          expect(result).to.have.lengthOf(0)
    
          await contract.connect(participant1).buyTicket(giveawayId, numberToGenerate - 1, {
            value: fee,
          })
    
          result = await contract.getGiveaway(giveawayId)
          expect(result.participants.toNumber()).to.be.equal(1)
          result = await contract.getGiveawayParticipants(giveawayId)
          expect(result).to.have.lengthOf(1)
        })
    })

    describe('Selecting Winners', () => {
        beforeEach(async () => {
          await contract.createGiveaway(title, description, image, prize, fee, expiresAt)
    
          await contract.importLuckyNumbers(giveawayId, generateLuckyNumbers(numberToGenerate))
    
          await contract.connect(participant1).buyTicket(giveawayId, numberToGenerate - 1, {
            value: fee,
          })
    
          await contract.connect(participant2).buyTicket(giveawayId, numberToGenerate - 2, {
            value: fee,
          })
    
          await contract.connect(participant3).buyTicket(giveawayId, numberToGenerate - 3, {
            value: fee,
          })
    
          await contract.connect(participant4).buyTicket(giveawayId, numberToGenerate - 4, {
            value: fee,
          })
    
          await contract.connect(participant5).buyTicket(giveawayId, numberToGenerate - 5, {
            value: fee,
          })
        })
    
        it('Should confirm random winner selection', async () => {
          result = await contract.getGiveawayParticipants(giveawayId)
          expect(result).to.have.lengthOf(numberToGenerate)
    
          result = await contract.getGiveawayResult(giveawayId)
          expect(result.winners).to.have.lengthOf(0)
    
          await contract.randomlySelectWinners(giveawayId, numberOfWinners)
    
          result = await contract.getGiveawayResult(giveawayId)
          expect(result.winners).to.have.lengthOf(numberOfWinners)
        })
      })

      describe('Paying Winners', () => {
        beforeEach(async () => {
          await contract.createGiveaway(title, description, image, prize, fee, expiresAt)
    
          await contract.importLuckyNumbers(giveawayId, generateLuckyNumbers(numberToGenerate))
    
          await contract.connect(participant1).buyTicket(giveawayId, numberToGenerate - 1, {
            value: fee,
          })
    
          await contract.connect(participant2).buyTicket(giveawayId, numberToGenerate - 2, {
            value: fee,
          })
    
          await contract.connect(participant3).buyTicket(giveawayId, numberToGenerate - 3, {
            value: fee,
          })
    
          await contract.connect(participant4).buyTicket(giveawayId, numberToGenerate - 4, {
            value: fee,
          })
    
          await contract.connect(participant5).buyTicket(giveawayId, numberToGenerate - 5, {
            value: fee,
          })
        })
    
        it('Should confirm payment of winners', async () => {
          result = await contract.serviceBalance()
          expect(Number(result)).to.be.equal(Number(toWei(numberToGenerate * fromWei(fee))))
    
          result = await contract.getGiveawayResult(giveawayId)
          expect(result.winners).to.have.lengthOf(0)
          expect(result.paidout).to.be.equal(false)
    
          await contract.randomlySelectWinners(giveawayId, numberOfWinners)
    
          result = await contract.getGiveawayResult(giveawayId)
          expect(result.winners).to.have.lengthOf(numberOfWinners)
          expect(result.paidout).to.be.equal(true)
    
          result = await contract.serviceBalance()
          expect(result.toNumber()).to.be.equal(0)
        })
      })
    
})

  
