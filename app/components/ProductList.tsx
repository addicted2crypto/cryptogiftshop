"use client"

import { useState } from "react"
import ProductCard from "./ProductCard"
import CheckoutForm from "./CheckoutForm"
import type { Product } from "@/lib/types"

const products: Product[] = [
  { id: 1, name: "Red Roses", category: "Flowers", price: 50, image: "/red-roses.png" },
  { id: 2, name: "Assorted Chocolates", category: "Candy", price: 30, image: "/chocolates.png" },
  { id: 3, name: "MacBook Pro", category: "Electronics", price: 3999, image: "/macbook-pro.png" },
]

export default function ProductList() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Available Gifts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onSelect={() => setSelectedProduct(product)} />
        ))}
      </div>
      {selectedProduct && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Selected Gift: {selectedProduct.name}</h3>
          <CheckoutForm product={selectedProduct} />
        </div>
      )}
    </div>
  )
}

// The ProductList component displays a list of products as ProductCard components. When a product is selected, it displays the CheckoutForm component with the selected product.