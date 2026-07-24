"use client"
import { useEffect } from "react";
import Header from "./components/Header";
import Intro from "./components/Intro";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import 'lenis/dist/lenis.css'
import Lenis from 'lenis'
import ContactMe from "./components/ContactMe";
export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div>
      <Header />

      <div className="w-10/12 mx-auto">
        <Intro />
        <About />
        <Experience />
        <Projects />
        <ContactMe />
      </div>
    </div>
  );
}
