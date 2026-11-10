import { Link } from 'react-router'
import { LuMail, LuMapPin, LuPhone } from 'react-icons/lu'
import { FaFacebookF } from 'react-icons/fa6'
import logo from '../assets/logo-footer.webp'
import { business, navLinks, servicePath, services } from '../data/site'

export default function Footer() {
  return (
    <footer className="bg-ink-2 relative overflow-hidden border-t border-white/10 pb-24 md:pb-0">
      <div aria-hidden="true" className="bg-mow-stripes h-2 w-full" />
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
        <div>
          <Link to="/" className="inline-block rounded-xl" aria-label={`${business.name}, home`}>
            <img
              src={logo}
              alt="Top Flight Lawn Services logo: a striped D with a red zero-turn mower and the Dallas skyline"
              width="120"
              height="165"
              loading="lazy"
              className="w-28 rounded-xl"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm text-white/70">
            Locally owned lawn care for Dallas homes and businesses. Call us and get a free quote.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="font-display text-lg tracking-wide uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-white/75">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-mower transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-services-title">
          <h2 id="footer-services-title" className="font-display text-lg tracking-wide uppercase">
            Services
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {services.map((s) => (
              <li key={s.id}>
                <Link to={servicePath(s)} className="hover:text-mower transition-colors">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="font-display text-lg tracking-wide uppercase">Get in touch</h2>
          <address className="mt-4 space-y-3 not-italic">
            <p className="font-bold text-white">{business.name}</p>
            <p className="text-sm text-white/60">{business.owner}, Owner</p>
            <a href={business.phoneHref} className="hover:text-mower flex items-center gap-3 transition-colors">
              <LuPhone aria-hidden="true" className="text-mower" /> {business.phoneDisplay}
            </a>
            <a href={business.emailHref} className="hover:text-mower flex items-center gap-3 break-all transition-colors">
              <LuMail aria-hidden="true" className="text-mower shrink-0" /> {business.email}
            </a>
            <p className="flex items-center gap-3 text-white/75">
              <LuMapPin aria-hidden="true" className="text-mower" /> {business.city}
            </p>
          </address>
          <a
            href={business.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-mower hover:border-mower mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-bold transition-colors"
          >
            <FaFacebookF aria-hidden="true" /> Facebook
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p suppressHydrationWarning className="mx-auto max-w-6xl px-5 py-6 text-xs text-white/55 sm:px-8">
          &copy; {new Date().getFullYear()} {business.name}. Dallas, Texas.
        </p>
      </div>

      <p
        aria-hidden="true"
        className="font-display pointer-events-none absolute right-0 -bottom-6 text-[22vw] leading-none text-white/[0.03] select-none md:text-[14vw]"
      >
        TOP FLIGHT
      </p>
    </footer>
  )
}
