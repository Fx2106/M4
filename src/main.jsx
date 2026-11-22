
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'

import './index.css'
import App from './App.jsx'

// Creamos el cliente de TanStack Query
const queryClient = new QueryClient()

// Conectamos React con el HTML
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>
)
