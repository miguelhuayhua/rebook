"use client"
import TestimonialSection from "./components/testimonials-section"
import StatSection from "./components/stats-section"
import ProductListSection from "./components/productlist-section"
import { Hero } from "./components/hero"
import { AboutSection } from "./components/about-section"
import { ContactSection } from "./components/contact-section"
import { ServicesSection } from "./components/services-section"
import { FeaturesSection } from "./components/features-section"

export default function HomePage() {


  return (
    <div className="relative">

      <div className="relative z-20">
        {/* Hero Section */}
        <Hero />

        {/* Products Section */}

        <ProductListSection />
     
        {/* Services Section */}

        <ServicesSection />
        {/* Testimonials */}

        <TestimonialSection />

        {/* About Us Section (Nosotros) */}

        <AboutSection />
        <ContactSection />
      </div>
    </div>
  )
}
