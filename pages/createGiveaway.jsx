import React from 'react'
import SubHeader from '../components/SubHeader'
import Head from 'next/head'
import { useState } from 'react'
import { useRouter } from 'next/router'

const createGiveaway = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [prize, setPrize] = useState('')
  const [fee, setFee] = useState('')
  const [expiresAt, setExpiresAt] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageUrl || !prize || !fee|| !expiresAt) return
    const params = {
      title,
      description,
      imageUrl,
      prize,
      ticketPrice,
      expiresAt: new Date(expiresAt).getTime(),
    }
    console.log(params)
    onReset();
    router.push("/");

  }

  const onReset = () => {
    setTitle('')
    setDescription('')
    setImageUrl('')
    setPrize('')
    setFee('')
    setExpiresAt('')
  }
  return (
    <div>
      <Head>
        <title>HedaGiftaway || Create New Giveaway</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className='min-h-screen bg-slate-100'>
        <SubHeader />
        <div className="flex flex-col justify-center items-center mt-20">
          <div className=" flex flex-col items-center justify-center my-5">
            <h1 className="text-2xl font-bold text-slate-800 py-5">Create A Giveaway</h1>
            <p className="text-center text-sm text-slate-600">
              Reward your users with Hbar Tokens <br />
              Show them love
            </p>
          </div>
          <form onSubmit={handleSubmit}  className="w-full max-w-md">
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="title"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="imageUrl"
                type="url"
                placeholder="Image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="prize"
                type="number"
                step={0.01}
                min={0.01}
                placeholder="Prize"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="ticketPrice"
                type="number"
                step={0.01}
                min={0.01}
                placeholder="Giveaway fee"
                value={fee}
                onChange={(e) => setFee(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="expiresAt"
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <textarea
                className="appearance-none border rounded w-full py-2 px-3
                text-gray-700 leading-tight focus:outline-none
                focus:shadow-outline"
                id="description"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="flex justify-center">
              <button
                className="w-full bg-[#0c2856] hover:bg-[#1a396c] text-white font-bold
                py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit Giveaway
              </button>
            </div>
          </form>
      </div>
    </div>
    </div>
  )
}

export default createGiveaway