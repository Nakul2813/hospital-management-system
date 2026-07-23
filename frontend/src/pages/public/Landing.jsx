import PublicNavbar from "../../components/layout/PublicNavbar";
import Hero from "../../components/landing/Hero";
import Services from "../../components/landing/Services";
import {
  Departments,
  Doctors,
  Testimonials,
  EmergencyBanner,
  FAQ,
  CTA,
  Footer,
} from "../../components/landing/Sections";

export default function Landing() {
  return (
    <div className="min-h-screen bg-ink-50">
      <EmergencyBanner />
      <PublicNavbar />
      <Hero />
      <Services />
      <Departments />
      <Doctors />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
