import { MotionConfig } from "framer-motion";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import PricingSection from "@/components/pricing-section";
import TestimonialsSection from "@/components/testimonials-section";
import BlogSection from "@/components/blog-section";
import WorkshopsSection from "@/components/workshops-section";
import MentoriaSection from "@/components/mentoria-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-gradient-to-br from-background via-background-alt to-background hero-mesh">
        <Header />
        <main className="relative overflow-hidden">
          <HeroSection />
          <AboutSection />
          {/* <ServicesSection /> */}
          <PricingSection />
          <TestimonialsSection />
          <BlogSection />
          <WorkshopsSection />
          <MentoriaSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
