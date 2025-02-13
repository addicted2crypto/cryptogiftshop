
import CryptoRates from './components/CryptoRates'
import ProductList from './components/ProductList'
import Footer from './components/Footer';
export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Valentine's Day Crypto Gift Shop</h1>
      <div className="mb-8">
        <CryptoRates />
      </div>
      <ProductList />
      <Footer />
    </main>
  )
}
