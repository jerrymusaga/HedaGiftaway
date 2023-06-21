import Head from 'next/head'
import { useEffect } from 'react'
import SubHeader from '@/components/SubHeader'
import ResultFrame from '@/components/ResultFrame'

import {generateAGiveaway, generateGiveawayParticipants} from '@/services/fakeData'
import Winners from '@/components/Winners'

const Results = ({giveaway,participantList, giveawayResult}) => {
   
  return (
    <div>
    <Head>
      <title>HedaGiftaway | Results</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <div className="min-h-screen bg-slate-100">
      <SubHeader />
      <ResultFrame giveaway={giveaway} participants={participantList} result={giveawayResult} />
      <Winners />
    </div>
  </div>
  )
}

export const getServerSideProps = async (context) => {
    const { resultId } = context.query
    const giveaway = await generateAGiveaway(resultId)
    const participantList = await generateGiveawayParticipants(3)
    const giveawayResult = []
    return {
      props: {
        giveaway: JSON.parse(JSON.stringify(giveaway)),
        participantList: JSON.parse(JSON.stringify(participantList)),
        giveawayResult: JSON.parse(JSON.stringify(giveawayResult)),
      },
    }
  }

export default Results