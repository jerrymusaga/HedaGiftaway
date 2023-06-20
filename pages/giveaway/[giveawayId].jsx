import Head from 'next/head'
import SubHeader from '@/components/SubHeader'
import GiveawayTimeFrame from '@/components/GiveawayTimeFrame'


const Giveaway =() => {
 

  return (
    <div className="min-h-screen">
      <Head>
        <title>Giftaway | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <GiveawayTimeFrame />
      </div>
    </div>
  )
}

export default Giveaway;

