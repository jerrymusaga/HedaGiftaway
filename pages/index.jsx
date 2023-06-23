import Head from 'next/head'
import Header from '@/components/Header'
import Giveaways from '@/components/Giveaways'
import {generateGiveaways} from '@/services/fakeData'
import {getGiveaways} from '@/services/blockchain'


export default function Home({giveaways}) {
  
  return (
    <div className=''>
      <Head>
        <title>Giveaway Platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>
        <Header />
        <Giveaways giveaways={giveaways} />
      </h1>
    </div>
  )
}

export const getServerSideProps = async () => {
  const data = await getGiveaways();
  return {
    props: {
      giveaways: JSON.parse(JSON.stringify(data)),
    }
  }
}
