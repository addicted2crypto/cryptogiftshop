"use client"

import { useState } from "react"
import { ethers } from "ethers"
import { MetaMaskSDK } from "@metamask/sdk"
import type { Product } from "@/lib/types"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface CheckoutFormProps {
  product: Product
}

export default function CheckoutForm({ product }: CheckoutFormProps) {
  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [selectedCrypto, setSelectedCrypto] = useState("ETH")
  const [orderStatus, setOrderStatus] = useState<"idle" | "processing" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setOrderStatus("processing")

    try {
      const MMSDK = new MetaMaskSDK({
        dappMetadata: {
          name: "Valentine's Day Crypto Gift Shop",
          url: window.location.href,
        },
      })
      const ethereum = MMSDK.getProvider()

      
      if (!ethereum) {
        throw new Error("Please install MetaMask to make payments")
      }

      
      await ethereum.request({ method: "eth_requestAccounts" })

      
      const provider = new ethers.BrowserProvider(ethereum)

      
      const signer = provider.getSigner()

      
      const tx = await (await signer).sendTransaction({
        to: "mywallet.eth",
        value: ethers.parseEther(product.price.toString()),
      })

      
      await tx.wait()

      //will add backend storage for orders
      const order = {
        product,
        shippingInfo: { name, address, city, state, zip },
        transactionHash: tx.hash,
      }

      console.log("Order processed:", order)

      
      setOrderStatus("success")
    } catch (error) {
      console.error("Error processing payment:", error)
      setOrderStatus("error")
    }
  }

  if (orderStatus === "success") {
    return (
      <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
        <p className="font-bold">Order Placed Successfully!</p>
        <p>Your gift will be delivered by 5 PM on Valentine's Day.</p>
      </div>
    )
  }

  if (orderStatus === "error") {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
        <p className="font-bold">Error Processing Order</p>
        <p>Please try again or contact support.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block mb-1">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="address" className="block mb-1">
          Address
        </label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label htmlFor="city" className="block mb-1">
            City
          </label>
          <input
            type="text"
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="state" className="block mb-1">
            State
          </label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="zip" className="block mb-1">
            ZIP Code
          </label>
          <input
            type="text"
            id="zip"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>
      <div>
        <label htmlFor="crypto" className="block mb-1">
          Select Cryptocurrency
        </label>
        <select
          id="crypto"
          value={selectedCrypto}
          onChange={(e) => setSelectedCrypto(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="ETH">Ethereum (ETH)</option>
          <option value="AVAX">Avalanche (AVAX)</option>
          <option value="BTC">Bitcoin (BTC)</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={orderStatus === "processing"}
        className="w-full bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors disabled:bg-pink-300"
      >
        {orderStatus === "processing" ? "Processing..." : `Pay with ${selectedCrypto}`}
      </button>
    </form>
  )
}

