import React from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection1 from './components/Hero/HeroSection1';
import ServicesSection from './components/Sections/ServicesSection';
import MarqueeSection from './components/Sections/MarqueeSection';
import MarinLabsHero from './components/Sections/MarinLabsHero';
import OverlapShowcase from './components/Sections/OverlapShowcase';
import ContactSection from './components/Sections/ContactSection';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white">
      <Navbar />
      <HeroSection1 />
      <ServicesSection />
      <MarqueeSection />
      <div className="relative">
        <MarinLabsHero />
        <OverlapShowcase />
      </div>
      <ContactSection />
    </div>
  )
}

export default App