import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Giveaways = ({giveaways}) => {
  return (
    <div className="bg-slate-100 pt-5">
      <div className=" flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800 py-5">Giveaway Pots</h1>
        <p className="text-center text-sm text-slate-600">
          We bring an amazing deals of giveaways. <br />
          which is why participant love coming here to find luck.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-4 lg:gap-3 py-10 w-4/5 mx-auto">
        {giveaways?.map((giveaway, i) => (
          <Giveaway giveaway={giveaway} key={i} />
        ))}
      </div>
    </div>
  )
}

const Giveaway = ({ giveaway }) => {
    return (
      <div className="w-full shadow-xl shadow-black rounded-md overflow-hidden bg-gray-800 my-2 px-3 py-5">
        <div className="flex justify-start items-center space-x-2">
          <Image
            width={100}
            height={512}
            src={giveaway.image}
            alt="icon"
            className="rounded-lg w-20"
          />
          <div>
            <p className="text-green-300">Win: {giveaway.prize} HBar</p>
            <p className="text-sm text-gray-500">Draws On: {giveaway.drawsAt}</p>
          </div>
        </div>
        <div className="py-5">
          <p className="font-semibold pb-2 text-green-300">{giveaway.title}</p>
          <p className="text-sm leading-5 text-gray-500">{giveaway.description}</p>
        </div>
        <Link
          href={'/jackpots/' + giveaway.id}
          className="bg-green-500 hover:bg-rose-600 py-2 px-5
                rounded-md text-white font-semibold"
        >
          PLAY NOW
        </Link>
      </div>
    )
}

export default Giveaways