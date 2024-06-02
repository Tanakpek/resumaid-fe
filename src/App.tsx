import { useEffect, useState } from 'react'
import { AuthProvider } from './components/auth'
import { Routes, Route } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './views/home'
import React from 'react'
import { NavBar } from './components/navbar'
import { Profile } from './components/profile'
import { Login, Dashboard } from './components/login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
      <AuthProvider>
        <Routes>
            <Route path="/" element={<div><NavBar/> <Home/> </div>}>
              
            </Route>
            <Route path="/auth" element={<Dashboard/>}>
            </Route>
            <Route path="/profile" element={<div><NavBar/> <Profile/></div>}>
            </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
