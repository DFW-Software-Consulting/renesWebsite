// Single source of truth for real business info. Keep this honest:
// no invented stats, reviews, ratings, or years in business.

export const business = {
  name: 'Top Flight Lawn Services',
  owner: 'Rene Guillen',
  city: 'Dallas, TX',
  phoneDisplay: '214-779-4259',
  phoneHref: 'tel:2147794259',
  email: 'mowtopflight@gmail.com',
  emailHref: 'mailto:mowtopflight@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=100086916005109&mibextid=LQQJ4d',
}

export const services = [
  {
    id: 'mowing',
    title: 'Lawn Mowing',
    blurb: 'Clean, even cuts with crisp stripes and tidy edges, so your yard looks sharp from the curb.',
  },
  {
    id: 'shrubs',
    title: 'Shrub Trimming',
    blurb: 'Shaped, healthy shrubs and hedges that frame your property instead of taking it over.',
  },
  {
    id: 'trees',
    title: 'Tree Trimming',
    blurb: 'Overgrown branches cut back for a cleaner look, more light, and less mess in the yard.',
  },
  {
    id: 'cleanup',
    title: 'Clean-Up & Leaf Pick-Up',
    blurb: 'Seasonal clean-ups and leaf pick-up that get your yard back to ready.',
  },
  {
    id: 'gutters',
    title: 'Gutter Cleaning',
    blurb: 'Clogged gutters cleared out so rain goes where it should.',
  },
  {
    id: 'weeds',
    title: 'Weed Control',
    blurb: 'Keep weeds from crowding out your grass and beds.',
  },
]

export const steps = [
  { title: 'Call us', body: `Give Rene a call or send a message with what your yard needs.` },
  { title: 'Free quote', body: 'We take a look and give you a straight, no-cost quote.' },
  { title: 'We get to work', body: 'Mowing, trimming, and clean-up handled with care.' },
  { title: 'Enjoy your yard', body: 'Kick back. Your lawn looks top flight.' },
]

// Real, verified client reviews only. Add new ones to this array and the
// spotlight section picks them up automatically (controls appear at 2+).
// TODO(rene): add more real customer reviews here (quote + first name).
export const testimonials = [
  {
    name: 'Debra',
    quote:
      "I recently hired the team at Top Flight Lawn Services to take care of my lawn, and I couldn't be happier with the results! The crew was professional, courteous, and efficient, and they did an amazing job transforming my patchy, weedy lawn into a lush, green oasis. And best of all, their prices are very competitive compared to other lawn care services in the area. I would highly recommend Top Flight Lawn Services to anyone looking for top-quality lawn care!",
  },
]

// True facts only.
export const trustBadges = ['Locally owned', 'Dallas-based', 'Free quotes', 'Residential & commercial']

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]
