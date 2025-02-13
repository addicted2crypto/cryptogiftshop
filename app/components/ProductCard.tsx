import { Product } from '@/lib/types'
import Image from "next/image"


interface ProductCardProps {
  product: Product
  onSelect: () => void
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <div className="relative w-full h-48 mb-4">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded"
        />
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 mb-2">{product.category}</p>
      <p className="text-xl font-bold">${product.price.toLocaleString()}</p>
      <button
        onClick={onSelect}
        className="mt-4 bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors w-full"
      >
        Select Gift
      </button>
    </div>
  )
}

