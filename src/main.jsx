import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './routes/Routes'
import { ToastContainer } from 'react-toastify'
import AuthProvider from './provider/AuthProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
        <RouterProvider router={router} />
        <ToastContainer />
    </AuthProvider>
  </StrictMode>,
)
