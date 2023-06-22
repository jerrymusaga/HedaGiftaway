import { AppProps } from 'next/app'
import '@/styles/global.css'
import { useState, useEffect } from 'react'
import { Provider } from 'react-redux'
import {store} from '@/store'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild,setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
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
