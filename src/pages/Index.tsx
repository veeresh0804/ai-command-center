import { useState, useRef } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
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
import { SectionDivider, SectionWrapper } from "@/components/ScrollAnimations";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`min-h-screen bg-background scroll-smooth ${loading ? "overflow-hidden h-screen" : ""}`}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 z-[60] h-[2px] origin-left"
          style={{ scaleX, background: "linear-gradient(90deg, hsl(183 100% 50%), hsl(263 84% 52%))" }}
        />

        <Navbar />
        <HeroSection />

        <SectionWrapper>
          <SectionDivider />
          <AboutSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <SkillsSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <ProjectsSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <TimelineSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <CertificationsSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <ContactSection />
        </SectionWrapper>

        <Footer />
        <ChatBot />
      </motion.div>
    </>
  );
};

export default Index;
