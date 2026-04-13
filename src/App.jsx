import React from 'react'
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from './components/Navbar';

gsap.registerPlugin(useGSAP);

const App = () => {
  return (
    <div>
      <Navbar />
    </div>
  )
}

export default App