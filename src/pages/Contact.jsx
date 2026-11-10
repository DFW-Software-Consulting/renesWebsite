import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import emailjs from '@emailjs/browser'
import { toast } from 'sonner'
import { FaFacebookF } from 'react-icons/fa6'
import { LuLoaderCircle, LuMail, LuMapPin, LuPhone, LuSend } from 'react-icons/lu'
import Reveal, { Eyebrow } from '../components/Reveal'
import { business } from '../data/site'

const EMAILJS = {
  serviceId: 'service_0fdj2mx',
  templateId: 'template_s2t184g',
  publicKey: '_0eJeVE_0upDw61qU',
}

/** Floating-label field. The `name` attributes must stay name/email/message for the EmailJS template. */
function Field({ label, name, type = 'text', textarea = false, autoComplete }) {
  const id = useId()
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="group relative">
      <Tag
        id={id}
        name={name}
        type={textarea ? undefined : type}
        rows={textarea ? 6 : undefined}
        autoComplete={autoComplete}
        required
        placeholder=" "
        className="peer focus:border-mower w-full resize-none rounded-2xl border-2 border-white/15 bg-white/[0.04] px-5 pt-7 pb-3 text-lg text-white transition-colors outline-none focus:bg-white/[0.07]"
      />
      <label
        htmlFor={id}
        className="peer-focus:text-mower pointer-events-none absolute top-2.5 left-5 text-xs font-bold tracking-[0.15em] text-white/60 uppercase transition-all duration-200 peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:text-xs peer-focus:tracking-[0.15em] peer-focus:uppercase"
      >
        {label}
      </label>
      <span
        aria-hidden="true"
        className="bg-mow-stripes absolute inset-x-6 bottom-0 h-1 origin-center scale-x-0 rounded-full transition-transform duration-500 peer-focus:scale-x-100"
      />
    </div>
  )
}

function ContactCard({ href, icon: Icon, label, value, external = false }) {
  return (
    <motion.a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      whileHover={{ y: -4 }}
      className="group bg-ink-2 hover:border-mower flex items-center gap-4 rounded-3xl border border-white/10 p-5 transition-colors"
    >
      <span className="bg-mower grid size-12 shrink-0 place-items-center rounded-2xl text-xl text-white transition-transform group-hover:-rotate-6">
        <Icon aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-bold tracking-[0.2em] text-white/60 uppercase">{label}</span>
        <span className="block text-lg font-bold break-words">{value}</span>
        {external && <span className="sr-only">(opens in a new tab)</span>}
      </span>
    </motion.a>
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [sending, setSending] = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    if (sending) return
    setSending(true)
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, {
        publicKey: EMAILJS.publicKey,
      })
      toast.success('Message sent!', { description: `Thanks for reaching out. ${business.owner} will get back to you soon.` })
      formRef.current.reset()
    } catch {
      toast.error('Your message did not send.', {
        description: `Please try again, or call ${business.phoneDisplay}.`,
      })
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <title>Contact | Top Flight Lawn Services</title>
      <meta
        name="description"
        content="Get a free lawn care quote from Top Flight Lawn Services in Dallas. Call 214-779-4259 or send a message."
      />

      <section aria-labelledby="contact-title" className="relative isolate overflow-hidden px-5 pt-36 pb-24 sm:px-8 sm:pt-44">
        <div aria-hidden="true" className="bg-mower/25 absolute -top-40 -left-40 -z-10 size-[36rem] rounded-full blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <Eyebrow className="text-mower">Free quotes</Eyebrow>
          <motion.h1
            id="contact-title"
            className="font-display mt-6 text-[clamp(3.25rem,12vw,8rem)] leading-[0.88] uppercase"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            Let&rsquo;s talk <span className="text-mower">lawns.</span>
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl text-lg text-white/75"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Call us and get a free quote, or send a message and we will get back to you.
          </motion.p>

          <div className="mt-14 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <form
                ref={formRef}
                onSubmit={onSubmit}
                aria-describedby="form-note"
                aria-busy={sending}
                className="space-y-5 rounded-[2rem] border border-white/10 bg-white/[0.02] p-5 backdrop-blur sm:p-8"
              >
                <h2 className="font-display text-3xl tracking-wide uppercase">Send a message</h2>
                <p id="form-note" className="text-sm text-white/60">
                  All fields are required.
                </p>
                <Field label="Full name" name="name" autoComplete="name" />
                <Field label="Email" name="email" type="email" autoComplete="email" />
                <Field label="What does your yard need?" name="message" textarea />
                <motion.button
                  type="submit"
                  disabled={sending}
                  whileHover={sending ? undefined : { y: -2 }}
                  whileTap={sending ? undefined : { scale: 0.97 }}
                  className="bg-mower hover:bg-mower-dark relative inline-flex min-h-14 w-full items-center justify-center gap-3 overflow-hidden rounded-full px-8 text-base font-extrabold tracking-wide text-white uppercase transition-colors disabled:cursor-wait disabled:opacity-80 sm:w-auto"
                >
                  {sending && <span aria-hidden="true" className="bg-hazard animate-stripes absolute inset-0" />}
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={sending ? 'sending' : 'idle'}
                      className="relative inline-flex items-center gap-3"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.18 }}
                    >
                      {sending ? (
                        <>
                          <LuLoaderCircle aria-hidden="true" className="animate-spin" /> Sending&hellip;
                        </>
                      ) : (
                        <>
                          Send message <LuSend aria-hidden="true" />
                        </>
                      )}
                    </motion.span>
                  </AnimatePresence>
                </motion.button>
              </form>
            </Reveal>

            <Reveal delay={0.1} as="aside" aria-labelledby="owner-contact-title">
              <div className="from-mower to-mower-dark relative overflow-hidden rounded-[2rem] bg-gradient-to-br p-8">
                <div aria-hidden="true" className="bg-hazard absolute inset-0 opacity-40" />
                <p className="relative text-xs font-bold tracking-[0.25em] uppercase">Owner</p>
                <h2 id="owner-contact-title" className="font-display relative mt-2 text-5xl uppercase">
                  {business.owner}
                </h2>
                <p className="relative mt-2 font-semibold">{business.name}</p>
              </div>
              <div className="mt-4 space-y-3">
                <ContactCard href={business.phoneHref} icon={LuPhone} label="Call" value={business.phoneDisplay} />
                <ContactCard href={business.emailHref} icon={LuMail} label="Email" value={business.email} />
                <ContactCard href={business.facebook} icon={FaFacebookF} label="Facebook" value="Top Flight on Facebook" external />
                <div className="bg-ink-2 flex items-center gap-4 rounded-3xl border border-white/10 p-5">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white/10 text-xl">
                    <LuMapPin aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-bold tracking-[0.2em] text-white/60 uppercase">Service area</span>
                    <span className="block text-lg font-bold">{business.city}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
