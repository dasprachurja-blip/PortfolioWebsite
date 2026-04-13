import React from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from './components/Navbar';
import HeroSection1 from './components/Hero/HeroSection1';

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <div className="bg-brand-dark min-h-screen text-white">
      <Navbar />
      <HeroSection1 />
    </div>
  )
}

export default App