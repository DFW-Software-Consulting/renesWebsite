import PageHero from '../components/services/PageHero'
import { Eyebrow } from '../components/Reveal'
import { ServiceGrid } from '../components/home/Services'
import CtaBand from '../components/home/CtaBand'
import { business } from '../data/site'

export default function ServicesOverview() {
  return (
    <>
      <PageHero
        titleId="services-page-title"
        glow="right"
        padBottom="sm"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
        lead={<Eyebrow className="text-mower mt-8">Residential &amp; commercial</Eyebrow>}
        heading={
          <>
            Lawn care services in <span className="text-mower">Dallas, TX</span>
          </>
        }
      >
        {business.name} is a locally owned Dallas company offering lawn mowing, shrub and tree trimming, clean-ups and
        leaf pick-up, gutter cleaning, weed control, and flowerbeds and mulch for homes and businesses. Every quote is
        free. Call {business.phoneDisplay} or send us a message.
      </PageHero>

      <section aria-label="All services" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8 sm:pb-32">
        <ServiceGrid headingAs="h2" />
      </section>

      <CtaBand />
    </>
  )
}
