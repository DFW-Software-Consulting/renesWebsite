import { Link, useParams } from 'react-router'
import { LuArrowUpRight, LuBuilding2, LuCheck, LuHouse } from 'react-icons/lu'
import PageHero from '../components/services/PageHero'
import Reveal, { Eyebrow } from '../components/Reveal'
import { FaqList } from '../components/Faq'
import { SERVICE_ICONS } from '../components/home/Services'
import CtaBand from '../components/home/CtaBand'
import NotFound from './NotFound'
import { business, serviceById, serviceBySlug, servicePath } from '../data/site'

export default function ServicePage() {
  const { slug } = useParams()
  const service = serviceBySlug(slug)
  if (!service) return <NotFound />

  const Icon = SERVICE_ICONS[service.id]
  const path = servicePath(service)
  const related = service.related.map(serviceById)
  const audiences = [
    {
      icon: LuHouse,
      title: 'Homeowners',
      body: 'Houses across Dallas, quoted for your yard and what it actually needs.',
    },
    {
      icon: LuBuilding2,
      title: 'Businesses',
      body: 'Commercial properties in Dallas that need to look sharp for customers.',
    },
  ]

  return (
    <>
      <PageHero
        titleId="service-title"
        glow="left"
        padBottom="md"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path },
        ]}
        lead={
          <div className="mt-8 flex items-center gap-4">
            <span className="bg-mower grid size-12 place-items-center rounded-2xl text-white shadow-lg shadow-black/40">
              <Icon aria-hidden="true" className="size-6" />
            </span>
            <Eyebrow className="text-mower">Free quotes &middot; {business.city}</Eyebrow>
          </div>
        }
        headingClassName="max-w-5xl text-balance"
        heading={
          <>
            {service.title} in <span className="text-mower">Dallas, TX</span>
          </>
        }
      >
        {service.intro}
      </PageHero>

      <div className="mx-auto grid max-w-6xl gap-6 px-5 pb-24 sm:px-8 lg:grid-cols-2">
        <section aria-labelledby="included-title" className="bg-ink-2 relative overflow-hidden rounded-[2rem] border border-white/10 p-8 sm:p-10">
          <div aria-hidden="true" className="bg-mow-stripes absolute inset-x-0 top-0 h-1.5" />
          <h2 id="included-title" className="font-display text-4xl uppercase sm:text-5xl">
            What&rsquo;s included
          </h2>
          <ul className="mt-8 space-y-4">
            {service.included.map((item) => (
              <li key={item} className="flex gap-3 text-lg text-white/85">
                <LuCheck aria-hidden="true" className="text-turf mt-1 size-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="audience-title" className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
          <h2 id="audience-title" className="font-display text-4xl uppercase sm:text-5xl">
            Who it&rsquo;s for
          </h2>
          <p className="mt-4 text-lg text-white/75">Residential and commercial properties in Dallas, TX.</p>
          <ul className="mt-8 space-y-4">
            {audiences.map((a) => (
              <li key={a.title} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <a.icon aria-hidden="true" className="text-mower size-7 shrink-0" />
                <span>
                  <span className="font-display block text-xl tracking-wide uppercase">{a.title}</span>
                  <span className="mt-1 block text-white/70">{a.body}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section aria-labelledby="service-faq-title" className="mx-auto max-w-4xl px-5 pb-24 sm:px-8">
        <Eyebrow className="text-mower">FAQ</Eyebrow>
        <h2 id="service-faq-title" className="font-display mt-4 text-4xl uppercase sm:text-6xl">
          {service.title} questions
        </h2>
        <FaqList items={service.faqs} className="mt-10" />
      </section>

      <section aria-labelledby="related-title" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <Reveal>
          <h2 id="related-title" className="font-display text-4xl uppercase sm:text-6xl">
            Related services
          </h2>
        </Reveal>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {related.map((r) => {
            const RIcon = SERVICE_ICONS[r.id]
            return (
              <li key={r.id}>
                <Link
                  to={servicePath(r)}
                  className="group bg-ink-2 hover:border-mower/60 flex h-full flex-col rounded-3xl border border-white/10 p-7 transition-colors"
                >
                  <span className="flex items-center justify-between">
                    <span className="bg-mower grid size-11 place-items-center rounded-xl text-white transition-transform duration-500 group-hover:-rotate-6">
                      <RIcon aria-hidden="true" className="size-5" />
                    </span>
                    <LuArrowUpRight
                      aria-hidden="true"
                      className="group-hover:text-mower size-6 text-white/40 transition-[color,transform] group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </span>
                  <span className="font-display mt-6 text-2xl tracking-wide uppercase">{r.title}</span>
                  <span className="mt-2 text-white/70">{r.blurb}</span>
                </Link>
              </li>
            )
          })}
        </ul>
        <p className="mt-8">
          <Link
            to="/services"
            className="hover:text-mower font-extrabold uppercase underline decoration-2 underline-offset-8 transition-colors"
          >
            See all lawn care services
          </Link>
        </p>
      </section>

      <CtaBand title={`Need ${service.title.toLowerCase()} in Dallas?`} />
    </>
  )
}
