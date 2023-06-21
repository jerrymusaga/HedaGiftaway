
const generateAGiveaway =(id) => {
    const image = "https://cdn.vectorstock.com/i/1000x1000/09/06/giveaway-multicolored-lettering-sign-with-stars-vector-30290906.webp"
    const expiresIn = getRandomInt(7,10);
    const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).getTime();

    return {
        id,
        title: `Giveaway ${id}`,
        description: `This is the ${id} Giveaway`,
        owner: generateRandomHederaAddress(),
        prize: getRandomFloat(10,100).toFixed(2),
        fee: getRandomFloat(0.01, 0.1).toFixed(2),
        image,
        drawsAt: getRandomTimestamp(
            new Date('2023-01-01').getTime(),
            new Date('2023-12-30').getTime()
        ),
        createdAt: getRandomTimestamp(
            new Date('2023-01-01').getTime(),
            new Date('2023-12-30').getTime()
        ),
        expiresAt,
        participants: getRandomInt(10,100),
        drawn: false
    }
} 


const generateGiveaways = (n) => {
    const giveaways = [];
    for(let i = 1; i <= n; i++){
        const id = i.toString();
        const title = `${id} Hbar Giveaway`;
        const description = `This is the ${i} giveaway`;
        const owner = generateRandomHederaAddress();
        const prize = getRandomFloat(10,100).toFixed(2);
        const fee = getRandomFloat(0.01,0.1).toFixed(2);
        const image = '/images/network.webp';
        const createdAt = getRandomTimestamp(
            new Date('2023-01-01').getTime(),
            new Date('2023-12-30').getTime()
        );
        const drawsAt = getRandomTimestamp(
            new Date('2023-01-01').getTime(),
            new Date('2023-12-30').getTime()
        );
        const expiresIn = getRandomInt(7,30);
        const expiresAt = new Date(Date.now() + expiresIn * 24 * 60 * 60 * 1000).getTime();
        const participants = getRandomInt(10,100);
        const drawn = false;

        giveaways.push({
            id,
            title,
            description,
            owner,
            prize,
            fee,
            image,
            createdAt,
            drawsAt,
            expiresAt,
            participants,
            drawn
        })
    }
    return giveaways;
}

function generateGiveawayParticipants(count){
    const participants = [];
    const accounts = [
        "0xD11eD68F46153aa8A2F40a9490b76E9d50d79745",
        "0x750a20694b6C449dfb8974fD53029FBb80Ef0683",
        "0x122851EB3915cc769dECBf95a566e7fC8aAc2125",
        "0xe9794AEd70Bbf4B068f1EDBfefF8fBe820D20021",
        "0xfd4ABBc34E08BB7e989aFe454AdF224BfEA670FE",
        "0xcD8AA0D5C1459BF71cc2d03f6E3C394831630CCC"
    ]
    for(let i=0; i < count; i++){
        const participant = {
        account: accounts[Math.floor(Math.random() * accounts.length)],
        giveawayNumber: Math.random().toString(36).substring(2,8),
        paid: false
        };
        participants.push(participant);
    }
    return participants
}

function generateRandomHederaAddress(){
    let address = '0x'
    let hexChars = '0123456789abcdef'

    for (let i=0; i < 35; i++){
        address += hexChars.charAt(Math.floor() * hexChars.length);
    }

    return address;
}

function getPurchasedNumbers(length){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const result = []
    for(let i=0; i<length; i++){
        let string = '';
        for(let j=0; j<6; j++){
            string += characters.charAt(Math.floor(Math.random() * characters.length))
        }
        result.push(string);
    }
    return result;
}

function getRandomFloat(min, max){
    return Math.random() * (max-min) + min;
}

function getRandomTimestamp(min,max){
    return Math.floor(Math.random() * (max-min + 1) + min)
}

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max-min + 1) + min)
}


export {generateGiveaways, generateAGiveaway, generateGiveawayParticipants, getPurchasedNumbers}