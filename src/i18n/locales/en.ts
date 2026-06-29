import type { Translations } from '../types'

const en: Translations = {
  meta: {
    title: 'Srushti Farm House | Farmstay Donje, Pune',
    description:
      'Book Srushti Farm House — farmhouse in Donje, Sinhgad, Pune. 23 km from city centre. Pool, rain dance, campfire & unlimited meals. Packages from ₹999/person.',
  },
  common: {
    bookNow: 'Book Now',
    call: 'Call',
    whatsapp: 'WhatsApp',
    perPerson: '/ person',
    getDirections: 'Get Directions',
    callNow: 'Call',
    allRightsReserved: 'All rights reserved.',
    bookOnWhatsApp: 'Book on WhatsApp',
    seePackages: 'See packages',
  },
  nav: {
    about: 'About',
    experiences: 'Experiences',
    packages: 'Packages',
    gallery: 'Gallery',
    location: 'Location',
    contact: 'Contact',
  },
  hero: {
    tagline: 'Srushti Farm House · Sinhgad, Donje, Pune',
    title: 'Your weekend escape, 23 km from Pune',
    subtitle: 'Pool, rain dance, campfire & unlimited meals — for families, friends & groups.',
    bookStay: 'Book on WhatsApp',
    explorePackages: 'See packages',
    scrollToExplore: 'Scroll',
    badges: ['All meals included', 'Family safe', '23 km from Pune'],
  },
  about: {
    eyebrow: 'Why Srushti',
    title: 'Everything you need for a perfect weekend',
    stats: [
      { label: 'Distance', value: '23 km from Pune' },
      { label: 'Meals', value: 'Unlimited veg & non-veg' },
      { label: 'Activities', value: 'Pool + 12 games' },
      { label: 'Best for', value: 'Families & groups' },
    ],
    slides: [
      { alt: 'Swimming pool at Srushti Farm House near Sinhgad Pune', caption: 'Pool' },
      { alt: 'Outdoor dining and unlimited meals at Srushti Farm House', caption: 'Meals' },
      { alt: 'Family gathering at Srushti Farm House Donje', caption: 'Family gatherings' },
    ],
  },
  experiences: {
    title: 'What you can do here',
    outdoorTitle: 'Outdoor',
    indoorTitle: 'Indoor',
    outdoor: [
      { title: 'Swimming Pool' },
      { title: 'Rain Dance' },
      { title: 'Campfire Nights' },
      { title: 'Cricket' },
      { title: 'Football' },
      { title: 'Badminton' },
      { title: 'Lawn Games' },
    ],
    indoor: [
      { title: 'Karaoke / Bluetooth Music' },
      { title: 'Indoor Games' },
      { title: 'Chess' },
      { title: 'Carrom' },
      { title: 'Ludo' },
      { title: 'Group Activities', tag: 'Teams 10+' },
      { title: 'Relaxation Spaces' },
    ],
  },
  packages: {
    eyebrow: 'Packages',
    title: 'Pick your package',
    mostPopular: 'Most popular',
    bestForFamilies: 'Best for families',
    footerNote: 'All packages include unlimited meals. Limited-meal option: 10% off.',
    askCustomPlan: 'Need a custom plan?',
    foodNote: 'Great food included in every package.',
    foodHighlights: ['Unlimited meals', 'Veg & non-veg', 'Tea & snacks all day'],
    items: [
      {
        name: 'Day Escape',
        timing: '9 AM – 5 PM',
        price: 999,
        features: ['Unlimited meals', 'Pool & rain dance', 'All games'],
        whatsappMessage:
          'Hi Srushti Farm House, I want to book Day Escape (9 AM – 5 PM) at ₹999/person. Please share availability.',
      },
      {
        name: 'Overnight Stay',
        timing: '4 PM – 10 AM',
        price: 1499,
        features: ['Dinner + breakfast', 'Campfire night', 'Pool & all activities'],
        whatsappMessage:
          'Hi Srushti Farm House, I want to book Overnight Stay (4 PM – 10 AM) at ₹1,499/person. Please share availability.',
      },
      {
        name: 'Full Day & Night',
        timing: '4 PM – 4 PM',
        price: 1999,
        popular: true,
        features: ['24-hour stay', 'Unlimited meals', 'All activities'],
        whatsappMessage:
          'Hi Srushti Farm House, I want to book Full Day & Night (4 PM – 4 PM) at ₹1,999/person. Please share availability.',
      },
      {
        name: 'Family Full Stay',
        timing: '11 AM – 11 AM',
        price: 1999,
        familyPick: true,
        features: ['Day + night combo', 'All meals & snacks', 'Pool & campfire'],
        whatsappMessage:
          'Hi Srushti Farm House, I want to book Family Full Stay (11 AM – 11 AM) at ₹1,999/person. Please share availability.',
      },
      {
        name: '2 Day Retreat',
        timing: '2 days',
        price: 3499,
        features: ['2 full days', 'All meals included', 'Every activity'],
        whatsappMessage:
          'Hi Srushti Farm House, I want to book 2 Day Retreat at ₹3,499/person. Please share availability.',
      },
    ],
  },
  gallery: {
    title: 'Moments from Srushti Farm House, Sinhgad',
    categories: {
      pool: 'Pool',
      rooms: 'Rooms',
      nature: 'Nature',
      activities: 'Activities',
      food: 'Food',
      events: 'Events',
      videos: 'Videos',
    },
    imageAlt: (category) => `Srushti Farm House - ${category}`,
    instagramCta: 'More photos, reels & guest moments on Instagram & Facebook',
    instagramButton: 'Follow on Instagram',
    facebookButton: 'Follow on Facebook',
    viewMorePhotos: 'More photos on Instagram →',
  },
  testimonials: {
    title: 'Loved by guests from Pune',
    items: [
      {
        quote: 'Clean pool, amazing food, staff felt like family.',
        name: 'Aarti & Family',
        location: 'Kothrud, Pune',
        initial: 'A',
      },
      {
        quote: 'Campfire, rain dance, cricket — unbeatable value.',
        name: 'Rohit Deshmukh',
        location: 'Aundh, Pune',
        initial: 'R',
      },
      {
        quote: 'Peaceful, safe, kids never wanted to leave.',
        name: 'Sneha Kulkarni',
        location: 'Hinjewadi, Pune',
        initial: 'S',
      },
      {
        quote: 'Perfect team offsite. Easy from Pune.',
        name: 'Anand Patil',
        location: 'Camp, Pune',
        initial: 'A',
      },
    ],
  },
  policies: {
    title: 'Booking',
    badges: ['30% advance', 'Limited slots', 'Groups welcome', 'Safe & verified'],
    items: [
      {
        title: 'Advance booking',
        body: '30% non-refundable advance secures your slot.',
      },
      {
        title: 'Weekends & holidays',
        body: 'Book 1–2 weeks ahead for weekend slots.',
      },
      {
        title: 'Group bookings',
        body: '20+ guests? Custom pricing on WhatsApp.',
      },
      {
        title: 'Check-in & check-out',
        body: 'Timings follow your package. Late checkout on request.',
      },
      {
        title: 'Meals',
        body: 'Unlimited veg & non-veg meals, tea and snacks included.',
      },
      {
        title: 'ID required',
        body: 'Valid photo ID needed at check-in for every adult.',
      },
    ],
  },
  location: {
    title: '23 km from Pune',
    addressLabel: 'Address',
    phoneLabel: 'Phone',
    vistaAlt: 'Sinhgad Fort view from Srushti Farm House terrace near Pune',
    address: {
      name: 'Srushti Farm House, Sinhgad, Donje',
      line2: 'Donje, Sinhgad',
      line3: 'Pune, Maharashtra 411025',
    },
  },
  contact: {
    eyebrow: 'Contact',
    title: 'Ready to book? Message us on WhatsApp.',
    whatsappBooking: 'Book on WhatsApp',
    viewPackages: 'See packages',
    phoneLabels: {
      bookings: 'Bookings',
      reservations: 'Reservations',
      inquiries: 'Inquiries',
    },
    phonePurposes: {
      bookings: 'Bookings',
      reservations: 'Reservations',
      inquiries: 'Inquiries',
    },
  },
  footer: {
    tagline: 'Donje · Pune',
    description: 'Weekend farmhouse in Donje, Pune — pool, meals & activities included.',
    seoLine: 'Srushti Farm House · Donje, Pune',
    explore: 'Explore',
    contact: 'Contact',
    connect: 'Connect',
    whatsappBookings: 'WhatsApp for bookings',
    followInstagram: 'Follow us on Instagram for more photos & reels',
    followFacebook: 'Like our Facebook page for updates & event photos',
  },
  whatsapp: {
    default: 'Hi Srushti Farm House, I want to book a stay. Please share availability and packages.',
    customPlan: 'Hi Srushti Farm House, I want a custom plan. Please share details.',
    menu: 'Hi Srushti Farm House, I want to know more about your food menu. Please share details.',
    fab: 'Chat on WhatsApp',
    outreach: (purpose) =>
      `Hi Srushti Farm House, reaching out for ${purpose}. Please share details.`,
  },
  aria: {
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    pause: 'Pause',
    play: 'Play',
    mute: 'Mute',
    unmute: 'Unmute',
    whatsapp: 'WhatsApp',
    instagram: 'Instagram',
    facebook: 'Facebook',
  },
}

export default en
