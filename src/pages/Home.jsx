import Hero from '../components/home/Hero'
import ServicesMarquee from '../components/home/ServicesMarquee'
import Services from '../components/home/Services'
import Gallery from '../components/home/Gallery'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import AboutTeaser from '../components/home/AboutTeaser'
import CtaBand from '../components/home/CtaBand'
import FaqSection from '../components/Faq'

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesMarquee />
      <Services />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <AboutTeaser />
      <FaqSection />
      <CtaBand />
    </>
  )
}
