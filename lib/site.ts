// ==========================================================
// Jamia Bilal Islamia Lahore
// Global Site Configuration
// Version: 1.0
// ==========================================================

export const siteConfig = {
  // ========================================================
  // BASIC INFORMATION
  // ========================================================

  nameUr: "جامعہ بلال الاسلامیہ لاہور",

  nameAr: "جامعة بلال الإسلامية لاهور",

  nameEn: "Jamia Bilal Islamia Lahore",

  shortName: "Jamia Bilal",

  tagline: "علم، عمل اور اخلاق کا عظیم گہوارہ",

  description:
    "جامعہ بلال الاسلامیہ لاہور ایک مستند دینی و تعلیمی ادارہ ہے جہاں قرآن، حدیث، فقہ، حفظ القرآن،  کمپیوٹر شارٹ کورسز اور جدید علوم کی تعلیم دی جاتی ہے۔",

  established: "1985",

  organizationType: "Educational Organization",

  // ========================================================
  // BRANDING
  // ========================================================

  logo: "/images/logo.png",

  logoDark: "/images/logo-white.png",

  favicon: "/favicon.ico",

  defaultOgImage: "/images/og-image.jpg",

  themeColor: "#0B3B82",

  // ========================================================
  // CONTACT INFORMATION
  // ========================================================

  address: "یوکے سنٹر، چونا منڈی، لاہور، پاکستان",

  city: "Lahore",

  province: "Punjab",

  country: "Pakistan",

  postalCode: "54000",

  phone: "042-37651234",

  mobile: "0300-1234567",

  whatsapp: "923001234567",

  email: "info@jamiabilal.edu.pk",

  website: "https://jamiabilal.edu.pk",

  googleMaps:
    "https://maps.google.com",

  coordinates: {
    latitude: 31.573,
    longitude: 74.320,
  },

  officeHours: {
    monday: "07:00 AM - 04:00 PM",
    tuesday: "07:00 AM - 04:00 PM",
    wednesday: "07:00 AM - 04:00 PM",
    thursday: "07:00 AM - 04:00 PM",
    friday: "07:00 AM - 12:00 PM",
    saturday: "07:00 AM - 04:00 PM",
    sunday: "Closed",
  },

  // ========================================================
  // LANGUAGES
  // ========================================================

  defaultLanguage: "ur",

  supportedLanguages: ["ur", "en", "ar"],

  locale: "ur_PK",

  direction: "rtl",

  // ========================================================
  // SOCIAL MEDIA
  // ========================================================

  social: {
    facebook: "",

    youtube: "",

    instagram: "",

    x: "",

    linkedin: "",

    telegram: "",

    whatsapp: "",
  },

  // ========================================================
  // ONLINE SERVICES
  // ========================================================

  portals: {
    student: "/student",

    teacher: "/teacher",

    parent: "/parent",

    alumni: "/alumni",

    admissions: "/admissions",

    library: "/library",
  },

  // ========================================================
  // DONATIONS
  // ========================================================

  donation: {
    bankName: "",

    accountTitle: "",

    accountNumber: "",

    iban: "",

    jazzCash: "",

    easyPaisa: "",
  },

  // ========================================================
  // SEO
  // ========================================================

  seo: {
    title: "جامعہ بلال الاسلامیہ لاہور",

    titleTemplate: "%s | جامعہ بلال الاسلامیہ لاہور",

    description:
      "جامعہ بلال الاسلامیہ لاہور - قرآن، حدیث، فقہ، حفظ، تخصص، دعوت اور جدید علوم کا مستند مرکز۔",

    keywords: [
      "Jamia Bilal Islamia",
      "Jamia Bilal Lahore",
      "Islamic Education",
      "Darul Uloom",
      "Quran",
      "Hadith",
      "Fatwa",
      "Islamic University",
      "Madrasah Lahore",
      "Jamia Bilal",
    ],

    author: "Jamia Bilal Islamia Lahore",

    robots: "index,follow",

    locale: "ur_PK",
  },

  // ========================================================
  // COPYRIGHT
  // ========================================================

  copyright:
    "© 2026 Jamia Bilal Islamia Lahore. All Rights Reserved.",

  developer: "Jamia Bilal Software Team",

  // ========================================================
  // FEATURES
  // ========================================================

  features: {
    darkMode: true,

    search: true,

    onlineAdmission: true,

    library: true,

    aiSearch: false,

    multiLanguage: true,
  },
} as const;

export type SiteConfig = typeof siteConfig;