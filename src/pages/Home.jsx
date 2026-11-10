import Hero from '../components/home/Hero'
import ServicesMarquee from '../components/home/ServicesMarquee'
import Services from '../components/home/Services'
import Gallery from '../components/home/Gallery'
import HowItWorks from '../components/home/HowItWorks'
import Testimonials from '../components/home/Testimonials'
import AboutTeaser from '../components/home/AboutTeaser'
import CtaBand from '../components/home/CtaBand'

export default function Home() {
  return (
    <>
      <title>Top Flight Lawn Services | Dallas Lawn Care &amp; Free Quotes</title>
      <Hero />
      <ServicesMarquee />
      <Services />
      <Gallery />
      <HowItWorks />
      <Testimonials />
      <AboutTeaser />
      <CtaBand />
    </>
  )
}
