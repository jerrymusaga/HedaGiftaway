import Link from 'next/link'


const SubHeader = () => {
    const background = 'images/background.jpg'
    
    return (
        <div
        style={{ background: `url('${background}') fixed no-repeat top/cover` }}
        className="flex items-center justify-between text-white px-10 py-5"
        >
        <div>
            <Link href="/" className="text-xl font-bold">
            HedaGiftaway
            </Link>
        </div>

        <div className="hidden lg:flex items-center space-x-6 font-semibold">
            <p>Home</p>
            <p>How To Play</p>
            <p>All Giveaways</p>
            <p>Contact</p>
        </div>

        <button
        
            className="flex flex-nowrap border py-2 px-4 rounded-full bg-amber-500
            hover:bg-rose-600 cursor-pointer font-semibold text-sm"
        >
        Connect Wallet
        </button>
      
        </div>
    )
}

export default SubHeader