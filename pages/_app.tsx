import { AppProps } from 'next/app'
import '@/styles/global.css'
import { useState, useEffect } from 'react'

export default function MyApp({ Component, pageProps }: AppProps) {
  const [showChild,setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if(!showChild || typeof window === 'undefined') {
    return null
  }else {
    return (<Component {...pageProps} />)
  }
}
