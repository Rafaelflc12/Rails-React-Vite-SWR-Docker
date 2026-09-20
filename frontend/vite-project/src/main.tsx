import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'
import App from './App'
import { CartProvider } from './context/CartProvider'
import './index.css'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SWRConfig value={{ fetcher }}>
      <CartProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartProvider>
    </SWRConfig>
  </StrictMode>
)
