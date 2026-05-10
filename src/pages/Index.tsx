import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import DifferentialsSection from "@/components/DifferentialsSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import ContactSection from "@/components/ContactSection";

import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import FloatingEligibilityForm from "@/components/FloatingEligibilityForm";
import { useSeoMeta } from "@/hooks/useSeoMeta";

const Index = () => {
  useSeoMeta();
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <DifferentialsSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialsSection />
      <CTASection />
      <ContactSection />
      
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
