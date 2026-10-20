export interface RoomCategory {
  id: string;
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  longDescription: string;
  size: string;
  capacity: string;
  maxGuests: number;
  inventoryCount: number;
  bedConfiguration: string;
  view: string;
  image: string;
  gallery: string[];
  amenities: string[];
  highlights: string[];
}

export interface FacilityItem {
  id: string;
  title: string;
  shortLabel: string;
  category: string;
  description: string;
  details: string[];
  image: string;
  secondaryImage?: string;
  hours?: string;
  offsetClass: string;
  heightClass: string;
}

export interface DestinationItem {
  id: string;
  title: string;
  subtitle: string;
  walkingTime: string;
  distance: string;
  description: string;
  image: string;
  gridPosition: "left-tall" | "center-top" | "center-bottom" | "right-tall";
}

export interface TestimonialItem {
  id: string;
  guestName: string;
  origin: string;
  badge: string;
  date: string;
  quote: string;
  source: string;
  isPrimaryVerified?: boolean;
  rotationClass: string;
}

export const HOTEL_INFO = {
  name: "City Boutique Hotel",
  fullName: "City Boutique Hotel Sarajevo",
  starRating: "4-Star Boutique Hotel",
  establishedNote: "Over 20 years of hospitality in the heart of Sarajevo",
  manager: "Yaşar Tufan",
  managerTitle: "Hotel Manager",
  totalRooms: 24,
  address: {
    street: "Mula Mustafe Bašeskije 2",
    city: "Sarajevo",
    postalCode: "71000",
    country: "Bosnia and Herzegovina",
    full: "Mula Mustafe Bašeskije 2, Sarajevo 71000, Bosnia and Herzegovina",
    coordinates: {
      lat: 43.8590512,
      lng: 18.4226918,
    },
    googleMapsUrl:
      "https://www.google.com/maps/place/City+Boutique+Hotel/@43.8590512,18.4226918,17z",
    googleMapsEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d11507.37807709224!2d18.4226918!3d43.8590512!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4758c8db92af5763%3A0xfbf6a59547938d05!2sCity%20Boutique%20Hotel!5e0!3m2!1sen!2sba!4v1717583629317!5m2!1sen!2sba",
  },
  contact: {
    phone: "+387 33 566 850",
    phoneClean: "+38733566850",
    whatsapp: "+90 506 745 81 20",
    whatsappClean: "905067458120",
    whatsappUrl:
      "https://wa.me/905067458120?text=Hello%20City%20Boutique%20Hotel%20Sarajevo%2C%20I%20would%20like%20to%20inquire%20about%20room%20availability.",
    email: "novicityhotel@gmail.com",
  },
  socials: {
    instagram: "https://www.instagram.com/cityhotelsarajevo/",
    facebook: "https://www.facebook.com/hotelcitysarajevo",
  },
  ratingSummary: {
    score: "4.7",
    outOf: "5.0",
    reviewCount: "490+",
    platform: "Google Reviews (Verified on cityhotelsarajevo.com)",
  },
  certifications: [
    "4-Star Boutique Hotel",
    "100% Smoke-Free Property",
    "Halal-Certified Hospitality",
    "24/7 Multilingual Reception",
  ],
  policies: {
    checkIn: "From 14:00 (24/7 Reception for late arrivals)",
    checkOut: "Until 11:00 (Complimentary luggage checkroom available)",
    smoking: "100% Smoke-Free Guest Rooms & Indoor Spaces",
    breakfast: "Royal Turkish Breakfast served daily on the Rooftop Terrace",
    pricingNote:
      "Direct seasonal rates and tailored stays are confirmed directly by our reservations desk via inquiry, phone, or WhatsApp.",
  },
};

export const ROOM_CATEGORIES: RoomCategory[] = [
  {
    id: "standard-double",
    slug: "standard-double-room",
    name: "Standard Double Room",
    shortName: "Standard Room",
    tagline: "Intimate soundproof sanctuary with modern Bosnian warmth.",
    description:
      "Thoughtfully designed 15 m² double or twin room featuring soundproof windows, premium bedding, smart keyless entry, and a glass-partitioned rain shower bathroom.",
    longDescription:
      "Our Standard Double Rooms offer an intimate, serene retreat right on Mula Mustafe Bašeskije. Designed for couples and solo travelers seeking quiet restful nights in the center of Sarajevo, each room is equipped with acoustic soundproof windows, climate control, flat-screen satellite television, tea and coffee facilities, and an exclusive bathroom with natural toiletries, bathrobe, slippers, and a walk-in rain shower.",
    size: "15 m²",
    capacity: "2 Guests",
    maxGuests: 2,
    inventoryCount: 10,
    bedConfiguration: "1 Queen Bed or 2 Twin Beds",
    view: "Historic City Quarter View",
    image: "/images/hotel/room-standard-main.jpg",
    gallery: [
      "/images/hotel/room-standard-main.jpg",
      "/images/hotel/room-standard-2.jpg",
      "/images/hotel/room-standard-3.jpg",
      "/images/hotel/room-standard-4.jpg",
      "/images/hotel/bathroom-1.jpg",
    ],
    amenities: [
      "Soundproof Windows",
      "Individual Air Conditioning",
      "High-Speed Free Wi-Fi",
      "Flat-Screen TV",
      "Tea & Coffee Facilities",
      "Smart Keyless Entry",
      "Separate Rain Shower & Toilet",
      "Natural Bathroom Products",
      "Bathrobe & Slippers",
      "Hairdryer",
      "100% Smoke-Free",
      "Rooftop Turkish Breakfast Included",
    ],
    highlights: [
      "15 m² layout",
      "Up to 2 guests",
      "Soundproof comfort",
      "Rain shower bathroom",
    ],
  },
  {
    id: "deluxe-double",
    slug: "deluxe-double-room",
    name: "Deluxe / Superior Double Room",
    shortName: "Superior Room",
    tagline: "Elevated space and panoramic old-quarter views.",
    description:
      "Generously proportioned double room blending contemporary elegance with large windows overlooking Sarajevo's historic rooftops and minarets.",
    longDescription:
      "Our 8 Deluxe / Superior Double Rooms elevate your Sarajevo stay with expanded floor space, warm architectural lighting, and wide windows framing the timeless skyline of the historic quarter. Crafted with hardwood flooring, plush bedding, a dedicated work desk, and a glass-walled en-suite bathroom, this category balances boutique refinement with restful residential comfort.",
    size: "24 m²",
    capacity: "2 Guests",
    maxGuests: 2,
    inventoryCount: 8,
    bedConfiguration: "1 Designer Queen / King Bed",
    view: "Old Town Rooftops & Minarets View",
    image: "/images/hotel/sarajevo-oldtown.png",
    gallery: [
      "/images/hotel/sarajevo-oldtown.png",
      "/images/hotel/room-deluxe-main.jpg",
      "/images/hotel/room-deluxe-2.jpg",
      "/images/hotel/room-deluxe-3.jpg",
      "/images/hotel/room-deluxe-4.jpg",
    ],
    amenities: [
      "Panoramic City Windows",
      "Soundproof Acoustic Glazing",
      "Individual Air Conditioning",
      "High-Speed Free Wi-Fi",
      "Flat-Screen TV",
      "Tea & Coffee Maker",
      "Smart Keyless Entry",
      "Glass-Partitioned En-Suite Bathroom",
      "Bathrobe & Slippers",
      "Natural Toiletries & Hairdryer",
      "100% Smoke-Free",
      "Rooftop Turkish Breakfast Included",
    ],
    highlights: [
      "Expanded ~24 m² layout",
      "Up to 2 guests",
      "Old Quarter views",
      "Designer bathroom",
    ],
  },
  {
    id: "junior-suite",
    slug: "junior-suite",
    name: "Junior Suite",
    shortName: "Junior Suite",
    tagline: "Expansive 70 m² suite for families and extended stays.",
    description:
      "Our flagship 70 m² suite accommodating up to 5 guests, featuring designer queen and twin beds, leather pull-out sofas, and a refined lounge area.",
    longDescription:
      "With only 4 Junior Suites in the hotel, these expansive 70 m² residences provide rare space in the very heart of Sarajevo. Featuring a combination of queen and twin beds alongside a dedicated living area with leather pull-out sofas and mobile dining/work tables, the Junior Suite is tailored for families, small groups, or discerning travelers desiring a residential-scale suite steps from Baščaršija.",
    size: "70 m²",
    capacity: "Up to 5 Guests",
    maxGuests: 5,
    inventoryCount: 4,
    bedConfiguration: "Queen Bed + Twin Beds + Leather Pull-Out Sofa",
    view: "City Center & Old Town View",
    image: "/images/hotel/room-suite-main.jpg",
    gallery: [
      "/images/hotel/room-suite-main.jpg",
      "/images/hotel/room-suite-2.jpg",
      "/images/hotel/room-suite-3.jpg",
      "/images/hotel/room-suite-4.jpg",
      "/images/hotel/bathroom-2.jpg",
    ],
    amenities: [
      "Expansive 70 m² Floorplan",
      "Dedicated Lounge & Seating Area",
      "Leather Pull-Out Sofa",
      "Soundproof Windows",
      "Individual Air Conditioning",
      "High-Speed Free Wi-Fi",
      "Flat-Screen TV",
      "Tea & Coffee Station",
      "Smart Keyless Entry",
      "Separate Toilet & Rain Shower",
      "Bathrobe, Slippers & Natural Amenities",
      "Rooftop Turkish Breakfast Included",
    ],
    highlights: [
      "70 m² suite",
      "Up to 5 guests",
      "Living lounge area",
      "Ideal for families",
    ],
  },
  {
    id: "apartment",
    slug: "apartment",
    name: "Penthouse Apartment",
    shortName: "Apartment",
    tagline: "Architectural top-floor living with private lounge and dining.",
    description:
      "Exclusive 50 m² top-floor apartment featuring bespoke wood-slat architectural details, separate living and dining space, and serene top-floor privacy.",
    longDescription:
      "Crowning the upper floor of City Boutique Hotel, our 2 Penthouse Apartments offer 50 m² of private architectural living. Highlighted by warm timber detailing, a full dining table, leather sofa lounge, and tranquil bedrooms with skylight and rooftop perspectives, the Apartment is a peaceful sanctuary above the vibrant streets of central Sarajevo.",
    size: "50 m²",
    capacity: "2–4 Guests",
    maxGuests: 4,
    inventoryCount: 2,
    bedConfiguration: "Queen / Twin Beds + Separate Living & Dining Room",
    view: "Top-Floor Rooftop & Courtyard View",
    image: "/images/hotel/room-apartment-main.jpg",
    gallery: [
      "/images/hotel/room-apartment-main.jpg",
      "/images/hotel/room-apartment-2.jpg",
      "/images/hotel/room-apartment-3.jpg",
      "/images/hotel/room-apartment-4.jpg",
      "/images/hotel/hero-room.jpg",
    ],
    amenities: [
      "50 m² Top-Floor Apartment",
      "Private Dining & Living Room",
      "Architectural Timber Detailing",
      "Soundproof Windows",
      "Individual Air Conditioning",
      "High-Speed Free Wi-Fi",
      "Flat-Screen TV",
      "Tea & Coffee Facilities",
      "Smart Keyless Entry",
      "Exclusive Bathroom with Natural Products",
      "Bathrobe & Slippers",
      "Rooftop Turkish Breakfast Included",
    ],
    highlights: [
      "50 m² apartment",
      "2–4 guests",
      "Separate dining & lounge",
      "Top-floor privacy",
    ],
  },
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "turkish-breakfast",
    title: "Royal Turkish Breakfast",
    shortLabel: "Turkish Breakfast",
    category: "Culinary & Dining",
    description:
      "Begin each morning with our signature Halal-certified Turkish breakfast spread — freshly brewed Turkish tea and Bosnian coffee, artisan cheeses, olives, warm pastries, seasonal fruits, and made-to-order eggs.",
    details: [
      "Served daily in the panoramic breakfast lounge and terrace",
      "100% Halal-certified ingredients and local Bosnian delicacies",
      "Traditional brewed Turkish çay & authentic Bosnian coffee",
      "Freshly baked simit, burek, cheeses, honey, and seasonal fruit",
    ],
    image: "/images/hotel/breakfast-vertical.jpg",
    secondaryImage: "/images/hotel/breakfast-main.jpg",
    hours: "Daily • 07:30 – 10:30",
    offsetClass: "lg:mt-2",
    heightClass: "h-[240px] sm:h-[270px] lg:h-[295px]",
  },
  {
    id: "lobby-lounge",
    title: "Boutique Lobby & Lounge",
    shortLabel: "Lobby Lounge",
    category: "Guest Spaces",
    description:
      "An intimate ground-floor lounge adorned with Bosnian art, plush velvet seating, and warm hospitality — ideal for quiet reading, afternoon tea, or meeting your private tour guide.",
    details: [
      "Warm contemporary salon steps from Mula Mustafe Bašeskije",
      "All-day room service and refreshments upon request",
      "High-speed fiber Wi-Fi throughout all common areas",
      "Complimentary checkroom and secure luggage storage",
    ],
    image: "/images/hotel/lobby-lounge.jpg",
    secondaryImage: "/images/hotel/lobby-2.jpg",
    hours: "Open 24 Hours",
    offsetClass: "lg:mt-6",
    heightClass: "h-[240px] sm:h-[270px] lg:h-[320px]",
  },
  {
    id: "rooftop-terrace",
    title: "Panoramic Rooftop Terrace",
    shortLabel: "Rooftop Terrace",
    category: "Signature Experience",
    description:
      "Overlooking the terracotta rooftops, Austro-Hungarian facades, and minarets of Old Town Sarajevo, our glass-framed rooftop terrace is the heart of morning breakfast and twilight relaxation.",
    details: [
      "Unobstructed views over central Sarajevo and surrounding hills",
      "Outdoor rattan lounge seating and indoor glass conservatory",
      "Morning Turkish breakfast and evening tea service",
      "Tranquil sanctuary above the historic city center",
    ],
    image: "/images/hotel/hero-terrace.jpg",
    secondaryImage: "/images/hotel/terrace-view.png",
    hours: "Daily • 07:30 – 23:00",
    offsetClass: "lg:mt-0",
    heightClass: "h-[280px] sm:h-[330px] lg:h-[375px]",
  },
  {
    id: "elegant-rooms",
    title: "Soundproof Boutique Rooms",
    shortLabel: "Elegant Rooms",
    category: "Accommodation",
    description:
      "24 smoke-free rooms and suites engineered with acoustic windows, smart keyless entry, natural bath products, and walk-in rain showers for uninterrupted rest in the city center.",
    details: [
      "Smart Key contactless room entry across all 24 rooms",
      "Acoustic soundproofing for peaceful sleep in the city heart",
      "Glass-walled rain showers with bathrobes and slippers",
      "Dedicated climate control and flat-screen satellite TVs",
    ],
    image: "/images/hotel/sarajevo-oldtown.png",
    secondaryImage: "/images/hotel/room-deluxe-main.jpg",
    hours: "24 Rooms & Suites",
    offsetClass: "lg:mt-5",
    heightClass: "h-[240px] sm:h-[270px] lg:h-[320px]",
  },
  {
    id: "reception-concierge",
    title: "24/7 Reception & Tours",
    shortLabel: "24/7 Reception",
    category: "Concierge & Mobility",
    description:
      "Round-the-clock multilingual reception and instant WhatsApp concierge for airport transfers, car rental, and curated private tours to Mostar, Blagaj, Travnik, and Jajce.",
    details: [
      "24/7 front desk for late arrivals and early departures",
      "Instant WhatsApp concierge (+90 506 745 81 20)",
      "Private Sarajevo Airport (SJJ) transfers & Rent-a-Car",
      "Tailored day tours: Sarajevo, Mostar & Kravice, Travnik & Jajce",
    ],
    image: "/images/hotel/reception-main.jpg",
    secondaryImage: "/images/hotel/dining-lounge.jpg",
    hours: "24 Hours / 7 Days",
    offsetClass: "lg:mt-2",
    heightClass: "h-[240px] sm:h-[270px] lg:h-[295px]",
  },
];

export const ADDITIONAL_SERVICES = [
  {
    title: "Smart Keyless Entry",
    description:
      "Secure, contactless smart-key access to your guest room from the moment you check in.",
  },
  {
    title: "Complimentary Checkroom",
    description:
      "Arriving early or departing late? Store your luggage safely with our complimentary checkroom service while you explore Baščaršija.",
  },
  {
    title: "Instant WhatsApp Concierge",
    description:
      "Message our team anytime for immediate assistance with directions, dining recommendations, or reservation adjustments.",
  },
  {
    title: "Airport Transfer & Rent-a-Car",
    description:
      "Direct private transfers between Sarajevo International Airport (SJJ) and our front door, plus vetted vehicle rental.",
  },
  {
    title: "Private Bosnia Day Tours",
    description:
      "Curated excursions arranged directly from the hotel: Sarajevo City Tour, Mostar–Konjic–Blagaj–Počitelj Tour, and Travnik–Jajce Waterfalls Tour.",
  },
  {
    title: "All-Day Room Service",
    description:
      "Enjoy Turkish tea, Bosnian coffee, and refreshments delivered directly to your room throughout the day.",
  },
];

export const SARAJEVO_DESTINATIONS: DestinationItem[] = [
  {
    id: "bascarsija-sebilj",
    title: "Baščaršija & Sebilj Fountain",
    subtitle: "15th-Century Ottoman Bazaar",
    walkingTime: "5 min walk",
    distance: "400m from hotel",
    description:
      "Step out of City Boutique Hotel and stroll five minutes east into Sarajevo's historic Ottoman marketplace. Watch coppersmiths hand-craft traditional coffee sets along Kazandžiluk alley, gather around the iconic wooden Sebilj fountain, and savor authentic ćevapi at Željo (just 3 minutes away).",
    image: "/images/hotel/landmark-sebilj.jpg",
    gridPosition: "left-tall",
  },
  {
    id: "latin-bridge",
    title: "Latin Bridge & Miljacka River",
    subtitle: "Crossroads of World History",
    walkingTime: "8 min walk",
    distance: "550m from hotel",
    description:
      "Follow the scenic embankments of the Miljacka River to the 16th-century Ottoman stone arches of the Latin Bridge — where centuries of European history converged.",
    image: "/images/hotel/landmark-latin-bridge.jpg",
    gridPosition: "center-top",
  },
  {
    id: "trebevic-cable-car",
    title: "Trebević Mountain & Cable Car",
    subtitle: "Alpine Views Over Sarajevo",
    walkingTime: "15 min",
    distance: "Panoramic Gondola",
    description:
      "Ascend from the old town into crisp pine forests aboard the Sarajevo Cable Car for sweeping sunset vistas over the valley and Olympic bobsled tracks.",
    image: "/images/hotel/sarajevo-trebevic.jpg",
    gridPosition: "center-bottom",
  },
  {
    id: "gazi-husrev-beg-mosque",
    title: "Gazi Husrev-beg Mosque",
    subtitle: "1530 Ottoman Architectural Masterpiece",
    walkingTime: "5 min walk",
    distance: "350m from hotel",
    description:
      "Just steps from our front door stands the finest example of classical Ottoman architecture in the Balkans, surrounded by its tranquil stone courtyard, wooden fountain (Šadrvan), historic clock tower, and the meeting line of East and West on Ferhadija.",
    image: "/images/hotel/landmark-mosque.jpg",
    gridPosition: "right-tall",
  },
];

export const BOSNIAN_DELICACIES = [
  {
    title: "Traditional Bosnian Coffee",
    subtitle: "Served in copper džezva",
    description:
      "Slow-roasted and served in hand-hammered copperware with rahatlokum — a cherished daily ritual across Sarajevo's courtyards.",
    image: "/images/hotel/bosnian-coffee.jpg",
  },
  {
    title: "Artisan Bosnian Burek",
    subtitle: "Rolled phyllo pastry baked under sač",
    description:
      "Paper-thin hand-stretched dough filled with seasoned meat or local cheeses, baked to a golden crisp just steps from our hotel.",
    image: "/images/hotel/bosnian-burek.jpg",
  },
  {
    title: "Rooftop Turkish Breakfast",
    subtitle: "Every morning at City Boutique Hotel",
    description:
      "Our signature spread overlooking Sarajevo's terracotta rooftops, pairing Turkish hospitality with fresh Bosnian produce.",
    image: "/images/hotel/dining-lounge.jpg",
  },
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "review-location",
    guestName: "Verified Guest Highlight",
    origin: "Old Town • 5 Min to Baščaršija",
    badge: "Location • 4.9/5",
    date: "Verified Property Highlight",
    quote:
      "Situated right on Mula Mustafe Bašeskije, you can walk to Baščaršija, Gazi Husrev-beg Mosque, and the National Theater in under five minutes while sleeping behind quiet soundproof windows.",
    source: "Google Reviews • 490+ Reviews",
    rotationClass: "lg:-rotate-[3deg] lg:translate-y-4",
  },
  {
    id: "review-breakfast",
    guestName: "Verified Guest Highlight",
    origin: "Rooftop Terrace • Sarajevo",
    badge: "Breakfast • Halal Certified",
    date: "Verified Property Highlight",
    quote:
      "Waking up to the royal Turkish breakfast on the rooftop terrace overlooking Sarajevo's rooftops and minarets is unforgettable — fresh pastries, cheeses, omelets, and endless Turkish tea.",
    source: "Google Reviews • 490+ Reviews",
    rotationClass: "lg:-rotate-[1.5deg] lg:translate-y-1",
  },
  {
    id: "review-caner",
    guestName: "Caner Ç.",
    origin: "Verified Guest • Google Review",
    badge: "★ 5.0 / 5.0 Verified Stay",
    date: "August 2025",
    quote:
      "The hotel is spotless, the morning breakfast is diverse and delicious in the city center. The staff is friendly, the hotel owner Yaşar Bey takes special care of all the guests, the only place to stay when I come to Sarajevo is like home.",
    source: "Featured on cityhotelsarajevo.com",
    isPrimaryVerified: true,
    rotationClass: "lg:rotate-0 lg:-translate-y-2",
  },
  {
    id: "review-hospitality",
    guestName: "Verified Guest Highlight",
    origin: "24/7 Reception & Concierge",
    badge: "Hospitality • Yaşar Tufan & Team",
    date: "Verified Property Highlight",
    quote:
      "From late-night airport arrivals to instant WhatsApp recommendations and private day tours to Mostar, the 24-hour reception team treats every guest like family in Sarajevo.",
    source: "Google Reviews • 490+ Reviews",
    rotationClass: "lg:rotate-[1.5deg] lg:translate-y-1",
  },
  {
    id: "review-rooms",
    guestName: "Verified Guest Highlight",
    origin: "24 Smoke-Free Rooms & Suites",
    badge: "Cleanliness & Comfort",
    date: "Verified Property Highlight",
    quote:
      "Spotlessly clean rooms with smart keyless entry, modern glass rain showers, bathrobes, and spacious Junior Suites and Apartments that make family stays in central Sarajevo effortless.",
    source: "Google Reviews • 490+ Reviews",
    rotationClass: "lg:rotate-[3deg] lg:translate-y-4",
  },
];

export const GALLERY_IMAGES = [
  {
    id: "gal-1",
    src: "/images/hotel/hero-terrace.jpg",
    title: "Rooftop Terrace at Twilight",
    category: "Terrace & Views",
    aspect: "wide",
  },
  {
    id: "gal-2",
    src: "/images/hotel/sarajevo-oldtown.png",
    title: "Deluxe Double Room with Old Quarter View",
    category: "Rooms & Suites",
    aspect: "wide",
  },
  {
    id: "gal-3",
    src: "/images/hotel/breakfast-main.jpg",
    title: "Royal Turkish Breakfast Spread",
    category: "Turkish Breakfast",
    aspect: "wide",
  },
  {
    id: "gal-4",
    src: "/images/hotel/room-apartment-main.jpg",
    title: "Penthouse Apartment Bedroom",
    category: "Rooms & Suites",
    aspect: "wide",
  },
  {
    id: "gal-5",
    src: "/images/hotel/terrace-view.png",
    title: "Morning Coffee Overlooking Sarajevo",
    category: "Terrace & Views",
    aspect: "wide",
  },
  {
    id: "gal-6",
    src: "/images/hotel/reception-main.jpg",
    title: "24/7 Reception & Entrance Salon",
    category: "Lobby & Lounge",
    aspect: "wide",
  },
  {
    id: "gal-7",
    src: "/images/hotel/room-suite-main.jpg",
    title: "Junior Suite Bedroom & En-Suite",
    category: "Rooms & Suites",
    aspect: "wide",
  },
  {
    id: "gal-8",
    src: "/images/hotel/room-apartment-2.jpg",
    title: "Penthouse Apartment Living & Dining Room",
    category: "Rooms & Suites",
    aspect: "wide",
  },
  {
    id: "gal-9",
    src: "/images/hotel/dining-lounge.jpg",
    title: "Rooftop Breakfast Over Terracotta Roofs",
    category: "Turkish Breakfast",
    aspect: "wide",
  },
  {
    id: "gal-10",
    src: "/images/hotel/lobby-lounge.jpg",
    title: "Ground-Floor Boutique Lounge",
    category: "Lobby & Lounge",
    aspect: "wide",
  },
  {
    id: "gal-11",
    src: "/images/hotel/room-standard-main.jpg",
    title: "Standard Double Room",
    category: "Rooms & Suites",
    aspect: "wide",
  },
  {
    id: "gal-12",
    src: "/images/hotel/room-suite-2.jpg",
    title: "Spacious Suite Interior",
    category: "Rooms & Suites",
    aspect: "wide",
  },
  {
    id: "gal-13",
    src: "/images/hotel/landmark-sebilj.jpg",
    title: "Sebilj Fountain in Baščaršija (5 Min Walk)",
    category: "Sarajevo",
    aspect: "tall",
  },
  {
    id: "gal-14",
    src: "/images/hotel/landmark-latin-bridge.jpg",
    title: "Historic Latin Bridge Over the Miljacka",
    category: "Sarajevo",
    aspect: "wide",
  },
  {
    id: "gal-15",
    src: "/images/hotel/landmark-mosque.jpg",
    title: "Gazi Husrev-beg Mosque Courtyard",
    category: "Sarajevo",
    aspect: "tall",
  },
  {
    id: "gal-16",
    src: "/images/hotel/bathroom-1.jpg",
    title: "Glass-Partitioned Rain Shower Bathroom",
    category: "Rooms & Suites",
    aspect: "wide",
  },
];
