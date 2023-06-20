import Link from 'next/link'
import React from 'react'
import { FaEthereum } from 'react-icons/fa'

const GiveawayTimeFrame = () => {
  return (
    <div className='py-10 px-5 bg-slate-100'>
        <div className='flex flex-col items-center justify-center text-center py-10 '>
            <h4 className='text-4xl text-slate-700 text-center font-bold pb-3'>
                Register For A Giveaway Contest
            </h4>
            <p className='text-lg text-gray-600 font-semibold capitalize'>giveaway?.title</p>
            <p className='text-sm text-gray-500 w-full sm:w-2/3'>giveaway?.description</p>
            <p className='text-sm font-medium text-black w-full sm:w-2/3'>giveaway?.participants participants</p>
        </div>
        <div className='flex flex-col justify-center items-center space-y-4 mb-6'>
            {/* {giveaway?.expiresAt ? <Countdown timestamp={giveaway?.expiresAt} /> : null} */}
            <div className='flex justify-center items-center space-x-2'>
                <button className='flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500 hover:bg-rose-600 font-semibold'>
                    Generate Lucky Numbers
                </button>
            </div>
            <Link href={`/results/` + 1}
                className='flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500 hover:bg-rose-600 font-semibold'
            >
                Randomly Select Lucky Giveaway Winners
            </Link>
        </div>
        <div className="bg-white text-sm overflow-x-auto flex flex-col w-full sm:w-3/4 mx-auto p-5 rounded-md">
        <div className="pb-4 text-center">
          <p className="semibold text-2xl">Select Your winning Giveaway Numbers</p>
        </div>

        <table className="table-auto">
          <thead className="max-h-80 overflow-y-auto block">
            <tr className="flex justify-between text-left">
              <th className="px-4 py-2 ">#</th>
              <th className="px-4 py-2 ">Giveaway Ticket Fee</th>
              <th className="px-4 py-2 ">Giveaway Expiry Date</th>
              <th className="px-4 py-2 ">Giveaway Ticket Number</th>
              <th className="px-4 py-2 ">Action</th>
            </tr>
          </thead>
          <tbody className="max-h-80 overflow-y-auto block">
            {Array(5).fill()?.map((luckyNumber, i) => (
              <tr className="flex justify-between border-b text-left" key={i}>
                <td className="px-4 py-2 font-semibold">{i + 1}</td>
                <td className="px-4 py-2 font-semibold">
                  <div className="flex justify-center items-center space-x-1">
                    <FaEthereum />
                    <span>giveaway?.ticketPrice</span>
                  </div>
                </td>
                <td className="px-4 py-2 font-semibold">giveaway?.ExpiresAt</td>
                <td className="px-4 py-2 font-semibold">luckyNumber</td>
                <td className="px-4 py-2 font-semibold">
                  <button
                    // disabled={participants.includes(luckyNumber)}
                    // onClick={() => handlePurchase(i)}
                    // className={`bg-black ${
                    //   participants.includes(luckyNumber)
                    //     ? 'opacity-50 cursor-not-allowed'
                    //     : 'hover:bg-rose-600'
                    // } text-white text-sm py-2 px-4 rounded-full`}
                  >
                    BUY NOW
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default GiveawayTimeFrame