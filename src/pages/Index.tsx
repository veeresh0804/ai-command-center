import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import StatsSection from "@/components/StatsSection";
import SkillsSection from "@/components/SkillsSection";
import SkillsGalaxy from "@/components/SkillsGalaxy";
import ProjectsSection from "@/components/ProjectsSection";
import ProjectPlayground from "@/components/ProjectPlayground";
import MLVisualizationsSection from "@/components/MLVisualizationsSection";
import TimelineSection from "@/components/TimelineSection";
import CertificationsSection from "@/components/CertificationsSection";
import GitHubActivitySection from "@/components/GitHubActivitySection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import BackToTop from "@/components/BackToTop";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import { SectionDivider, SectionWrapper } from "@/components/ScrollAnimations";

const Index = () => {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <>
      <CustomCursor />

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
          <StatsSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <SkillsSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <SkillsGalaxy />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <ProjectsSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <ProjectPlayground />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <MLVisualizationsSection />
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
          <GitHubActivitySection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <BlogSection />
        </SectionWrapper>

        <SectionWrapper>
          <SectionDivider />
          <ContactSection />
        </SectionWrapper>

        <Footer />
        <ChatBot />
        <BackToTop />
      </motion.div>
    </>
  );
};

export default Index;
