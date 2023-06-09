import Head from 'next/head'
import SubHeader from '@/components/SubHeader'
import GiveawayTimeFrame from '@/components/GiveawayTimeFrame'
import {generateAGiveaway, generateGiveawayParticipants, getPurchasedNumbers} from "@/services/fakeData"
import Generator from '@/components/Generator'
import {getGiveaway} from "@/services/blockchain"

const Giveaway =({giveaway, purchasedNumbers, giveawayNumbers}) => {
    
  return (
    <div className="min-h-screen">
      <Head>
        <title>HedaGiftaway | Draws</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-slate-100">
        <SubHeader />
        <GiveawayTimeFrame giveaway={giveaway} luckyNumbers={giveawayNumbers} participants={purchasedNumbers} />
        <Generator />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
    const { giveawayId } = context.query
    const giveaway = await getGiveaway(giveawayId)
    const purchasedNumbers = await getPurchasedNumbers(giveawayId)
    const giveawayNumbers = await getPurchasedNumbers(giveawayId)
  
    return {
      props: {
        giveaway: JSON.parse(JSON.stringify(giveaway)),
        giveawayNumbers: JSON.parse(JSON.stringify(giveawayNumbers)),
        purchasedNumbers: JSON.parse(JSON.stringify(purchasedNumbers)),
      },
    }
  }

export default Giveaway;

