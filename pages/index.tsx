import Head from 'next/head'
import Header from '@/components/Header'
import Giveaways from '@/components/Giveaways'

const data = [
  {
      id: 1,
      title: "Lois Cake Hbar giveaway",
      description: "Thanks for the patronage",
      image: "/images/network.webp",
      prize: "100",
      fee: "0.002"
  },
  {
    id: 1,
    title: "Football Bonanza Hbar giveaway",
    description: "Lucky winners",
    image: "/images/network.webp",
    prize: "50",
    fee: "0.002"
  }

]

export default function Home() {
  const giveaways = data;
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
