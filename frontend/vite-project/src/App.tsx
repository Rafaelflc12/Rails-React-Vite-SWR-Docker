import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { ProductsPage } from './pages/ProductsPage'
import CartPage from './pages/CartPage'

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/carrinho" element={<CartPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
