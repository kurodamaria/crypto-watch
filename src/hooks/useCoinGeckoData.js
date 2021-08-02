import { useEffect, useState } from "react"

import CoinGecko from 'coingecko-api'
const CoinGeckoClient = new CoinGecko()

export function useCoinGeckoData() {
  const [cryptoData, setCryptoData] = useState(undefined)
  useEffect(() => {
    CoinGeckoClient.coins.all()
      .then(data => {
        setCryptoData(data.data)
      })
  }, [])
  return cryptoData
}