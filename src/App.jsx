import React from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection1 from './components/Hero/HeroSection1';
import ServicesSection from './components/Sections/ServicesSection';
import ShowcaseSection from './components/Sections/ShowcaseSection';
import MarqueeSection from './components/Sections/MarqueeSection';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white">
      <Navbar />
      <HeroSection1 />
      <ServicesSection />
      <ShowcaseSection />
      <MarqueeSection />
    </div>
  )
}

export default App