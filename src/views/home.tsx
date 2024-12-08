import '../App.css'
import viteLogo from '../../public/vite.svg'
import reactLogo from '../assets/react.svg'
import { useEffect, useRef, useState } from 'react'
import React from 'react'

// im
import { NavBar } from "@/src/components/navbar"
import { useAuth } from '@/src/components/auth'
import { Hero } from '@/src/components/landing/Hero'
import { Sponsors } from '@/src/components/landing/Sponsors'
import { HowItWorks } from '@/src/components/landing/HowItWorks'
import { Features } from '@/src/components/landing/Features'
import { InfiniteMovingCardsDemo, Services } from '@/src/components/landing/Services'
import { Cta } from '@/src/components/landing/Cta'
import { Testimonials } from '@/src/components/landing/Testimonials'
import { Team } from '@/src/components/landing/Team'
import { Pricing } from '@/src/components/landing/Pricing'
import { Newsletter } from '@/src/components/landing/Newsletter'
import { FAQ } from '@/src/components/landing/FAQ'
import { Footer } from '@/src/components/landing/Footer'
import { ScrollToTop } from '@/src/components/landing/ScrollToTop'
import { About } from '@/src/components/landing/About'
import ErrorBoundary from '../components/ui/errorBoundary'

export const Home = () => {
    const [count, setCount] = useState(0)
    const auth = useAuth();

    // const observer = useRef(null);
    // const elementRef = useRef([
    //     <ErrorBoundary><Hero /></ErrorBoundary>,
    //     <ErrorBoundary > <About /></ErrorBoundary >,
    //     <ErrorBoundary><HowItWorks /></ErrorBoundary>,
    //     <ErrorBoundary><Features /></ErrorBoundary>,
    //     <ErrorBoundary><Services /></ErrorBoundary>,
    //     <ErrorBoundary><Cta /></ErrorBoundary>,
    //     <ErrorBoundary><Testimonials /></ErrorBoundary>,
    //     <ErrorBoundary><Pricing /></ErrorBoundary>,
    //     <ErrorBoundary><Newsletter /></ErrorBoundary>,
    //     <ErrorBoundary><FAQ /></ErrorBoundary>,
    //     <ErrorBoundary><Footer /></ErrorBoundary>,
    //     <ErrorBoundary><ScrollToTop /></ErrorBoundary>
    // ]);
    // elementRef.current = [
    //     <ErrorBoundary><Hero /></ErrorBoundary>,
    //     <ErrorBoundary > <About /></ErrorBoundary >,
    //     <ErrorBoundary><HowItWorks /></ErrorBoundary>,
    //     <ErrorBoundary><Features /></ErrorBoundary>,
    //     <ErrorBoundary><Services /></ErrorBoundary>,
    //     <ErrorBoundary><Cta /></ErrorBoundary>,
    //     <ErrorBoundary><Testimonials /></ErrorBoundary>,
    //     <ErrorBoundary><Pricing /></ErrorBoundary>,
    //     <ErrorBoundary><Newsletter /></ErrorBoundary>,
    //     <ErrorBoundary><FAQ /></ErrorBoundary>,
    //     <ErrorBoundary><Footer /></ErrorBoundary>,
    //     <ErrorBoundary><ScrollToTop /></ErrorBoundary>
    // ]
    // const options = {
    //     root: null,
    //     rootMargin: '0px',
    //     threshold: 1.0
    // }
    // useEffect(() => {
        
    //     observer.current = new IntersectionObserver((entries) => {
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 console.log('Element is visible:', entry.target);
    //             }
    //             else{
    //                 console.log('Element is not visible:', entry.target);
    //             }
    //         });
    //     }, options);
        
    // }, [elementRef, options])
    return (
       <>
            <ErrorBoundary><Hero /></ErrorBoundary>
            <ErrorBoundary><About /></ErrorBoundary>
            <ErrorBoundary><HowItWorks /></ErrorBoundary>
            <ErrorBoundary><Features /></ErrorBoundary>
            <ErrorBoundary><Services /></ErrorBoundary>
            
            <ErrorBoundary><Cta /></ErrorBoundary>
            <ErrorBoundary><Testimonials /></ErrorBoundary>
            <ErrorBoundary><InfiniteMovingCardsDemo /></ErrorBoundary>
            <ErrorBoundary><Pricing /></ErrorBoundary>
            {/* <ErrorBoundary><Newsletter /></ErrorBoundary> */}
            <ErrorBoundary><FAQ /></ErrorBoundary>
            <ErrorBoundary><Footer /></ErrorBoundary>
            <ErrorBoundary><ScrollToTop /></ErrorBoundary> 
        </>

    )
    
}

export default Home