import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const background = 'images/background.jpg'
const network = '/images/network.webp'

const Header = () => {
  return (
    <div
        className='px-5 md:px-40'
        style={{background: `url('${background}') fixed no-repeat top/cover`}}
    >
        <div className='flex items-center justify-between text-white py-5'>
            <div>
                <h1 className='text-xl font-bold'>HedaGiftaway</h1>
            </div>
            <div className='hidden lg:flex items-center space-x-3 font-semibold'>
                <p>Home</p>
                <p>How to Participate</p>
                <p>All Giveaways</p>
                <p>Contact</p>
            </div>
            <button
                className='flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500 hover:bg-rose-600 cursor-pointer font-semibold text-sm'
            >Connect Wallet</button>
        </div>
        <div>
            <div className='flex items-center justify-between pb-5'>
                <div className='text-white py-5'>
                    <h2 className='text-4xl font-bold py-4'>
                        Partake in Giveaways, Get Lucky and <br/> Get Rewarded with Hbar on Hedera
                    </h2>
                    <p className='text-xl'>
                        Enable businesses to reward their clients and users through Giveaways <br />
                        Using Hedera's high throughput with fast finality; low, predictable fees, fair transaction & transparency
                    </p>
                </div>
            </div>
            <div className='hidden py-5 sm:block'>
                <Image 
                    src={network}
                    width={100}
                    height={100}
                    alt='network'
                    className='rounded-lg w-50'
                />
            </div>
        </div>
        <div className="pb-10">
        <Link
          href={'/create'}
          className="bg-amber-500 hover:bg-rose-600 text-white rounded-md
        cursor-pointer font-semibold py-3 px-5"
        >
          Create Giveaway
        </Link>
      </div>
    </div>
  )
}

export default Header;