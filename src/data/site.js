// Single source of truth for real business info. Keep this honest:
// no invented stats, reviews, ratings, or years in business.

export const SITE_URL = 'https://tfls.dfwsc.com'

export const business = {
  name: 'Top Flight Lawn Services',
  // E.164-ish form for schema.org / tel links. Keep in sync with phoneDisplay.
  phoneIntl: '+1-214-779-4259',
  locality: 'Dallas',
  region: 'TX',
  regionName: 'Texas',
  country: 'US',
  description:
    'Top Flight Lawn Services is a locally owned lawn care company in Dallas, TX, owned by Rene Guillen. We provide lawn mowing, shrub and tree trimming, clean-ups and leaf pick-up, gutter cleaning, weed control, and flowerbeds and mulch for residential and commercial properties. Quotes are free.',
  // TODO(rene): business hours. Omitted from the site and schema until confirmed.
  // TODO(rene): Dallas neighborhoods / nearby cities served. Only "Dallas, TX" is listed until confirmed.
  // TODO(rene): licensed / insured status. Never claim either until confirmed in writing.
  // TODO(rene): year founded / years in business. Omitted until confirmed.
  // TODO(rene): street address (or confirm service-area-only). Schema uses city/state only.
  // TODO(rene): Google Business Profile URL, to add to `sameAs` once claimed.
  owner: 'Rene Guillen',
  city: 'Dallas, TX',
  phoneDisplay: '214-779-4259',
  phoneHref: 'tel:2147794259',
  email: 'mowtopflight@gmail.com',
  emailHref: 'mailto:mowtopflight@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=100086916005109&mibextid=LQQJ4d',
  facebookReviewsUrl: 'https://www.facebook.com/profile.php?id=100086916005109&sk=reviews',
}

// Service catalog. Drives the home cards, /services, /services/<slug>, the footer,
// the sitemap, llms.txt, and the JSON-LD offer catalog. Copy must stay truthful:
// describe the work plainly, no prices, guarantees, or timelines we can't back up.
export const services = [
  {
    id: 'mowing',
    slug: 'lawn-mowing',
    title: 'Lawn Mowing',
    serviceType: 'Lawn mowing',
    blurb: 'Clean, even cuts with crisp stripes and tidy edges, so your yard looks sharp from the curb.',
    metaDescription:
      'Lawn mowing in Dallas, TX from Top Flight Lawn Services: clean, even cuts and tidy edges for homes and businesses. Call 214-779-4259 for a free quote.',
    intro:
      'Top Flight Lawn Services mows lawns across Dallas, TX for homeowners and businesses. We give your grass a clean, even cut, tidy up the edges, and leave the yard looking sharp from the curb. Quotes are free: call 214-779-4259.',
    included: [
      'Mowing the lawn to an even, clean cut',
      'Neat edges along walkways, driveways, and beds',
      'Clearing clippings off hard surfaces before we leave',
    ],
    faqs: [
      {
        q: 'Do you mow lawns in Dallas?',
        a: 'Yes. Top Flight Lawn Services is a locally owned, Dallas-based company that mows residential and commercial lawns in Dallas, TX.',
      },
      {
        q: 'How much does lawn mowing cost?',
        a: 'It depends on the size and condition of the yard, so we quote each property individually. Quotes are free. Call 214-779-4259 or send a message through the contact page.',
      },
      {
        q: 'Can you mow a commercial property?',
        a: 'Yes. We mow for both homes and businesses.',
      },
    ],
    related: ['weeds', 'shrubs', 'cleanup'],
  },
  {
    id: 'shrubs',
    slug: 'shrub-trimming',
    title: 'Shrub Trimming',
    serviceType: 'Shrub and hedge trimming',
    blurb: 'Shaped, healthy shrubs and hedges that frame your property instead of taking it over. Shrub and hedge removal available too.',
    metaDescription:
      'Shrub and hedge trimming in Dallas, TX, plus shrub and hedge removal. Top Flight Lawn Services shapes overgrown bushes for homes and businesses. Free quotes.',
    intro:
      'Top Flight Lawn Services trims and shapes shrubs and hedges in Dallas, TX, and removes the ones you no longer want. Overgrown bushes get cut back into clean shapes that frame your home or business instead of hiding it. Call 214-779-4259 for a free quote.',
    included: [
      'Trimming and shaping shrubs and hedges',
      'Cutting back overgrowth from windows, walkways, and walls',
      'Shrub and hedge removal',
      'Cleaning up the trimmings so the yard is left neat',
    ],
    faqs: [
      {
        q: 'Do you remove shrubs and hedges?',
        a: 'Yes. Along with trimming, we remove shrubs and hedges you want gone.',
      },
      {
        q: 'Can you trim hedges that have gotten really overgrown?',
        a: 'Yes. Cutting overgrown shrubs and hedges back into shape is a big part of this service. Tell us what you’re working with when you call and we’ll quote it for free.',
      },
      {
        q: 'Do you trim shrubs for businesses?',
        a: 'Yes. We work on both residential and commercial properties in Dallas.',
      },
    ],
    related: ['trees', 'flowerbeds', 'mowing'],
  },
  {
    id: 'trees',
    slug: 'tree-trimming',
    title: 'Tree Trimming',
    serviceType: 'Tree trimming',
    blurb: 'Overgrown branches cut back for a cleaner look, more light, and less mess in the yard.',
    metaDescription:
      'Tree trimming in Dallas, TX from Top Flight Lawn Services. We cut back overgrown branches for a cleaner look and more light. Free quotes: 214-779-4259.',
    intro:
      'Top Flight Lawn Services trims trees in Dallas, TX. We cut back overgrown branches so your yard looks cleaner, gets more light, and has less mess underneath. We serve homes and businesses, and quotes are free: call 214-779-4259.',
    included: [
      'Cutting back overgrown branches',
      'Thinning growth for a cleaner shape and more light',
      'Cutting back limbs hanging over the yard and walkways',
      'Cleaning up the cut branches',
    ],
    faqs: [
      {
        q: 'Do you trim trees in Dallas?',
        a: 'Yes. Tree trimming is one of our services for residential and commercial properties in Dallas, TX.',
      },
      {
        q: 'Do you clean up after trimming?',
        a: 'Yes. We clean up the branches we cut so your yard isn’t left with a mess.',
      },
      {
        q: 'How do I get a tree trimming quote?',
        a: 'Call 214-779-4259, email mowtopflight@gmail.com, or use the contact form. Quotes are free.',
      },
    ],
    related: ['shrubs', 'cleanup', 'gutters'],
  },
  {
    id: 'cleanup',
    slug: 'yard-cleanup-leaf-pickup',
    title: 'Clean-Up & Leaf Pick-Up',
    serviceType: 'Yard clean-up and leaf removal',
    blurb: 'Seasonal clean-ups and leaf pick-up that get your yard back to ready.',
    metaDescription:
      'Yard clean-ups and leaf pick-up in Dallas, TX. Top Flight Lawn Services clears leaves and yard debris for homes and businesses. Call for a free quote.',
    intro:
      'Top Flight Lawn Services does yard clean-ups and leaf pick-up in Dallas, TX. We clear out leaves, fallen branches, and built-up yard debris so your property is back to clean and ready. Residential and commercial, with free quotes at 214-779-4259.',
    included: [
      'Leaf pick-up from the lawn and beds',
      'Seasonal yard clean-ups',
      'Clearing fallen branches and yard debris',
    ],
    faqs: [
      {
        q: 'Do you do leaf pick-up?',
        a: 'Yes. We pick up leaves from lawns and flowerbeds as part of our clean-up service.',
      },
      {
        q: 'Can you clean up a yard that’s been neglected for a while?',
        a: 'Yes. Clean-ups are for exactly that: getting a yard that has gotten away from you back in shape. Call us for a free quote.',
      },
      {
        q: 'Do you offer clean-ups for commercial properties?',
        a: 'Yes. We serve both homes and businesses in Dallas.',
      },
    ],
    related: ['mowing', 'gutters', 'flowerbeds'],
  },
  {
    id: 'gutters',
    slug: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    serviceType: 'Gutter cleaning',
    blurb: 'Clogged gutters cleared out so rain goes where it should.',
    metaDescription:
      'Gutter cleaning in Dallas, TX from Top Flight Lawn Services. We clear leaves and debris out of clogged gutters. Homes and businesses. Free quotes: 214-779-4259.',
    intro:
      'Top Flight Lawn Services cleans gutters in Dallas, TX. We clear leaves and debris out of clogged gutters so rainwater can drain the way it should. We serve homes and businesses, and quotes are free: call 214-779-4259.',
    included: [
      'Clearing leaves and debris out of gutters',
      'Clearing clogs so water can flow to the downspouts',
      'Cleaning up the debris we remove',
    ],
    faqs: [
      {
        q: 'Do you clean gutters?',
        a: 'Yes. Gutter cleaning is one of our services in Dallas, TX, for both residential and commercial properties.',
      },
      {
        q: 'Can I add gutter cleaning to a yard clean-up?',
        a: 'Yes. Tell us everything you need when you call and we’ll put it all in one free quote.',
      },
      {
        q: 'How do I book gutter cleaning?',
        a: 'Call 214-779-4259, email mowtopflight@gmail.com, or send a message through the contact form for a free quote.',
      },
    ],
    related: ['cleanup', 'trees', 'mowing'],
  },
  {
    id: 'weeds',
    slug: 'weed-control',
    title: 'Weed Control',
    serviceType: 'Weed control',
    blurb: 'Keep weeds from crowding out your grass and beds.',
    metaDescription:
      'Weed control in Dallas, TX from Top Flight Lawn Services. We keep weeds from crowding out your lawn and flowerbeds. Homes and businesses. Free quotes.',
    intro:
      'Top Flight Lawn Services handles weed control in Dallas, TX. We work to keep weeds from crowding out your grass and taking over your flowerbeds, for homes and businesses alike. Call 214-779-4259 for a free quote.',
    included: [
      'Tackling weeds in the lawn',
      'Clearing weeds out of flowerbeds',
      'Weed/sheet barrier in beds as part of our flowerbed service',
    ],
    faqs: [
      {
        q: 'Do you offer weed control in Dallas?',
        a: 'Yes. Weed control is one of our services for residential and commercial properties in Dallas, TX.',
      },
      {
        q: 'Can you help keep weeds out of my flowerbeds?',
        a: 'Yes. We clear weeds from beds, and our flowerbed service includes fresh mulch and weed/sheet barrier to help keep them from coming back.',
      },
      {
        q: 'Is the weed control quote free?',
        a: 'Yes. All of our quotes are free. Call 214-779-4259 to get one.',
      },
    ],
    related: ['flowerbeds', 'mowing', 'cleanup'],
  },
  {
    id: 'flowerbeds',
    slug: 'flowerbeds-mulch',
    title: 'Flowerbeds & Mulch',
    serviceType: 'Flowerbed maintenance and mulching',
    blurb: 'Flowerbed clean-outs, fresh mulch, and weed/sheet barrier so your beds look sharp and stay that way.',
    metaDescription:
      'Flowerbed clean-outs, fresh mulch, and weed/sheet barrier in Dallas, TX from Top Flight Lawn Services. Homes and businesses. Free quotes: 214-779-4259.',
    intro:
      'Top Flight Lawn Services cleans out flowerbeds and lays fresh mulch in Dallas, TX. We clear out weeds and debris, put down weed/sheet barrier, and finish with fresh mulch so your beds look sharp and stay that way. Call 214-779-4259 for a free quote.',
    included: [
      'Flowerbed clean-outs: weeds, leaves, and debris removed',
      'Weed/sheet barrier laid down in the beds',
      'Fresh mulch spread evenly',
    ],
    faqs: [
      {
        q: 'Do you install mulch?',
        a: 'Yes. We spread fresh mulch as part of our flowerbed service in Dallas, TX.',
      },
      {
        q: 'What is weed/sheet barrier?',
        a: 'It’s a layer we put down in the bed under the mulch to help keep weeds from growing through.',
      },
      {
        q: 'Do you do flowerbeds for businesses?',
        a: 'Yes. We take care of flowerbeds at both homes and commercial properties.',
      },
    ],
    related: ['weeds', 'shrubs', 'cleanup'],
  },
]

export const serviceBySlug = (slug) => services.find((s) => s.slug === slug)
export const serviceById = (id) => services.find((s) => s.id === id)
export const servicePath = (s) => `/services/${s.slug}`

export const steps = [
  { title: 'Call us', body: `Give Rene a call or send a message with what your yard needs.` },
  { title: 'Free quote', body: 'We take a look and give you a straight, no-cost quote.' },
  { title: 'We get to work', body: 'Mowing, trimming, and clean-up handled with care.' },
  { title: 'Enjoy your yard', body: 'Kick back. Your lawn looks top flight.' },
]

export const tagline = 'High-quality lawn & home maintenance at the best prices'

// Real, verified client reviews only. Add new ones to this array and the
// spotlight section picks them up automatically (controls appear at 2+).
// TODO(rene): add more real customer reviews here (quote + first name).
export const testimonials = [
  {
    name: 'Debra',
    quote:
      "I recently hired the team at Top Flight Lawn Services to take care of my lawn, and I couldn't be happier with the results! The crew was professional, courteous, and efficient, and they did an amazing job transforming my patchy, weedy lawn into a lush, green oasis. And best of all, their prices are very competitive compared to other lawn care services in the area. I would highly recommend Top Flight Lawn Services to anyone looking for top-quality lawn care!",
  },
  {
    name: 'Jacob Rangel',
    source: 'Facebook recommendation',
    quote:
      "Top flight lawn services literally live up to their name! Great work as well as service, took care of my grass and didn't leave any grass behind would recommend them to anybody! Hit these guys up for your next grass needs!",
  },
]

// Recent Work gallery. The section renders nothing while this is empty.
// Fields: { src, alt, caption, before? } -- if `before` (image url) is set, the
// item renders as a before/after slider with `before` and `src` as the "after".
// Only real job photos belong here. Never stock images.
// TODO(rene): real job photos from Facebook go here
export const workPhotos = []

// True facts only.
export const trustBadges = ['Locally owned', 'Dallas-based', 'Free quotes', 'Residential & commercial']

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

// Site-wide FAQ (home page + FAQPage schema). Answer-first, true facts only.
export const faqs = [
  {
    q: 'Does Top Flight Lawn Services offer free quotes?',
    a: 'Yes. Every quote is free. Call 214-779-4259, email mowtopflight@gmail.com, or send a message through the contact form.',
  },
  {
    q: 'Where is Top Flight Lawn Services located?',
    a: 'We are based in Dallas, Texas, and serve homes and businesses in Dallas.',
  },
  {
    q: 'What lawn care services do you offer?',
    a: 'Lawn mowing, shrub trimming (including shrub and hedge removal), tree trimming, clean-ups and leaf pick-up, gutter cleaning, weed control, and flowerbeds and mulch (clean-outs, fresh mulch, and weed/sheet barrier).',
  },
  {
    q: 'Do you work on residential and commercial properties?',
    a: 'Yes. We take care of both residential and commercial properties.',
  },
  {
    q: 'How do I get a quote?',
    a: 'Call 214-779-4259, email mowtopflight@gmail.com, or fill out the contact form on our Contact page. Tell us what your yard needs and we will give you a free quote.',
  },
  {
    q: 'Who owns Top Flight Lawn Services?',
    a: 'Top Flight Lawn Services is locally owned by Rene Guillen. You can reach Rene directly at 214-779-4259.',
  },
  {
    q: 'Can I get one quote for several services?',
    a: 'Yes. Tell us everything your yard needs, like mowing, trimming, and a flowerbed refresh, and we will quote it together for free.',
  },
]
