import '../App.css'
import viteLogo from '../../public/vite.svg'
import reactLogo from '../assets/react.svg'
import { useState } from 'react'
import React from 'react'
import { Login } from '../components/login'
// im
import { NavBar } from "@/src/components/navbar"
import { useAuth } from '@/src/components/auth'
import { Hero } from '@/src/components/landing/Hero'
import { Sponsors } from '@/src/components/landing/Sponsors'
import { HowItWorks } from '@/src/components/landing/HowItWorks'
import { Features } from '@/src/components/landing/Features'
import { Services } from '@/src/components/landing/Services'
import { Cta } from '@/src/components/landing/Cta'
import { Testimonials } from '@/src/components/landing/Testimonials'
import { Team } from '@/src/components/landing/Team'
import { Pricing } from '@/src/components/landing/Pricing'
import { Newsletter } from '@/src/components/landing/Newsletter'
import { FAQ } from '@/src/components/landing/FAQ'
import { Footer } from 'react-day-picker'
import { ScrollToTop } from '@/src/components/landing/ScrollToTop'
import { About } from '@/src/components/landing/About'
import ErrorBoundary from '../components/ui/errorBoundary'

export const Home = () => {
    const [count, setCount] = useState(0)
    const auth = useAuth();


    return (
    <div>
            <ErrorBoundary><Hero /></ErrorBoundary>
            <ErrorBoundary><Sponsors /></ErrorBoundary>
            <ErrorBoundary><About /></ErrorBoundary>
            <ErrorBoundary><HowItWorks /></ErrorBoundary>
            <ErrorBoundary><Features /></ErrorBoundary>
            <ErrorBoundary><Services /></ErrorBoundary>
            <ErrorBoundary><Cta /></ErrorBoundary>
            <ErrorBoundary><Testimonials /></ErrorBoundary>
            <ErrorBoundary><Pricing /></ErrorBoundary>
            <ErrorBoundary><Newsletter /></ErrorBoundary>
            <ErrorBoundary><FAQ /></ErrorBoundary>
            <ErrorBoundary><Footer /></ErrorBoundary>
            <ErrorBoundary><ScrollToTop /></ErrorBoundary>
    </div >

    )
    
}

export default Home