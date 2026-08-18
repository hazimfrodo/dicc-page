import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import About from "@/components/About";
import Services from "@/components/Services";
import VisionMission from "@/components/VisionMission";
import News from "@/components/News";
import ParallaxDivider from "@/components/ParallaxDivider";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <StatsBar />
      <About />
      <Services />
      <VisionMission />
      <News />
      <ParallaxDivider />
      <CTA />
      <Contact />
      <Footer />
    </>
  );
}
