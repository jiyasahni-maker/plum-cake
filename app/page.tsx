import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import Hero from "@/components/hero/Hero";
import Projects from "@/components/projects/Projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Timeline from "@/components/timeline/Timeline";
import Research from "@/components/research/Research";
import Creative from "@/components/creative/Creative";
import Contact from "@/components/contact/Contact";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <Projects />

      <About />

      <Skills />

      <Timeline />

      <Research />

      <Creative />

      <Contact />

      <Footer />
    </>
  );
}