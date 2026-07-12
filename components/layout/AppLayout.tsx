import Navbar from "./Navbar";
import Footer from "./Footer";


import { Projects } from "@/components/projects";
import About from "@/components/about/About";
import Skills from "@/components/skills/Skills";
import Timeline from "@/components/timeline/Timeline";
import Research from "@/components/research/Research";
import Creative from "@/components/creative/Creative";
import Contact from "@/components/contact/Contact";
import Main from "./Main";
import RootBackground from "./RootBackground";
import CustomCursor from "./CustomCursor";
import ScrollProgress from "./ScrollProgress";
import { Hero } from "@/components/hero/Index";
import { Universe } from "../universe/Index";
export default function AppLayout() {
  return (
    <>
      <RootBackground />
       <CustomCursor/>

    <ScrollProgress/>
    <Universe>

      <Navbar />

      <Main>
        <Hero />

        <Projects />

        <About />

        <Skills />

        <Timeline />

        <Research />

        <Creative />

        <Contact />
      </Main>

      <Footer />
      </Universe>
    </>
  );
}