"use client"

import { useState, useEffect } from "react"
import axios from "axios"

export default function CryptoRates() {
  const [rates, setRates] = useState<{ [key: string]: number }>({})

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/simple/price?ids=avalanche-2,ethereum,bitcoin&vs_currencies=usd",
        )
        setRates({
          AVAX: response.data["avalanche-2"].usd,
          ETH: response.data.ethereum.usd,
          BTC: response.data.bitcoin.usd,
        })
      } catch (error) {
        console.error("Error fetching crypto rates:", error)
      }
    }

    fetchRates()
    const interval = setInterval(fetchRates, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-gray-500 p-4 rounded-lg mb-8">
      <h2 className="text-2xl font-semibold mb-4">Current Crypto Rates (USD)</h2>
      <div className="grid grid-cols-3 gap-4">
        {Object.entries(rates).map(([crypto, rate]) => (
          <div key={crypto} className="text-center">
            <p className="font-bold">{crypto}</p>
            <p>${rate.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// The CryptoRates component fetches the current exchange rates for AVAX, ETH, and BTC from the CoinGecko API and displays them in a grid.