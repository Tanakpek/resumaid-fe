import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './components/auth.tsx';
import { Elements } from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js';
import { ThemeProvider } from "@/components/ui/theme-provider"
import { DirtyContext, DirtyCVProvider } from './components/user/cv/dirtyTracker.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(

    <BrowserRouter>
      <React.StrictMode>
      <Elements stripe={(window as any).stripe as Stripe}>
      <AuthProvider>
        <DirtyCVProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
             <App />
          </ThemeProvider>
          </DirtyCVProvider>
      </AuthProvider>
      </Elements>
      </React.StrictMode>
    </BrowserRouter>

)
