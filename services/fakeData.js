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

function generateRandomHederaAddress(){
    let address = '0x'
    let hexChars = '0123456789abcdef'

    for (let i=0; i < 35; i++){
        address += hexChars.charAt(Math.floor() * hexChars.length);
    }

    return address;
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

export {generateGiveaways}