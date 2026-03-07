import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ServicesSection from '@/components/sections/ServicesSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import PublicationsSection from '@/components/sections/PublicationsSection'
import BookSpotlightSection from '@/components/sections/BookSpotlightSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <BookSpotlightSection />
      <PublicationsSection />
      <ContactSection />
    </main>
  );
}
