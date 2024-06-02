import '../App.css'
import viteLogo from '../../public/vite.svg'
import reactLogo from '../assets/react.svg'
import { useState } from 'react'
import React from 'react'
import { Login } from '../components/login'
// im
import { NavBar } from "@/src/components/navbar"
import { useAuth } from '../components/auth'

export const Home = () => {
    const [count, setCount] = useState(0)
    const auth = useAuth();


    return (
       
        <>
        <div>
        </div>
            
        </>
        

    )
    
}

export default Home