import { AppProps } from 'next/app'
import '@/styles/global.css'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import {store} from '@/store'
import { isWallectConnected } from '@/services/blockchain'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild,setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
    isWallectConnected()
  }, [])
  if(!showChild || typeof window === 'undefined') {
    return null
  }else {
    return (
      <Provider store={store}>
         <Component {...pageProps} />
      </Provider>
   
    )
  }
}
