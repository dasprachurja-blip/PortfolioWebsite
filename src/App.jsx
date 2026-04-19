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
import Footer from './components/Sections/Footer';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const App = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white">
      <div className="relative z-10 bg-[#050505] shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Navbar />
        <div id="home">
          <HeroSection1 />
        </div>
        <ServicesSection />
        <MarqueeSection />
        <div className="relative">
          <MarinLabsHero />
          <OverlapShowcase />
        </div>
        <ContactSection />
      </div>

      <div className="relative z-0">
        <Footer />
      </div>
    </div>
  )
}

export default App