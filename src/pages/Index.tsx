import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import TimelineSection from "@/components/TimelineSection";
import CertificationsSection from "@/components/CertificationsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import LoadingScreen from "@/components/LoadingScreen";
import { SectionDivider } from "@/components/ScrollAnimations";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <div
        ref={containerRef}
        className={`min-h-screen bg-background scroll-smooth ${loading ? "overflow-hidden h-screen" : ""}`}
      >
        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX }}
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
          style={{ scaleX, background: "linear-gradient(90deg, hsl(183 100% 50%), hsl(263 84% 52%))" }}
        />

        <Navbar />
        <HeroSection />
        <SectionDivider />
        <AboutSection />
        <SectionDivider />
        <SkillsSection />
        <SectionDivider />
        <ProjectsSection />
        <SectionDivider />
        <TimelineSection />
        <SectionDivider />
        <CertificationsSection />
        <SectionDivider />
        <ContactSection />
        <Footer />
        <ChatBot />
      </div>
    </>
  );
};

export default Index;
