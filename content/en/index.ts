import type { Dictionary } from "@/content/types";

/** English dictionary. Must match the shape of the Spanish one. */
export const en: Dictionary = {
  localeName: "English",

  nav: {
    home: "Home",
    solutions: "Solutions",
    industries: "Industries",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },

  actions: {
    requestQuote: "Request a Quote",
    whatsapp: "WhatsApp",
    call: "Call",
    email: "Send email",
    viewProjects: "View Projects",
    contact: "Contact",
    learnMore: "Learn more",
  },

  header: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    languageLabel: "Change language",
    brandHome: "Concrete Coatings Solutions — Go to home",
    primaryNav: "Primary navigation",
  },

  footer: {
    tagline: "Floor Sealing Experts",
    sincePrefix: "Since",
    legalNameLabel: "Legal name",
    navTitle: "Navigation",
    ethosLink: "Mission, Vision & Values",
    contactTitle: "Contact",
    contactPending: "Contact details coming soon.",
    rights: "All rights reserved.",
    backToTop: "Back to top",
  },

  hero: {
    titleLines: ["Solutions for", "Concrete Floors"],
    sinceLabel: "Since",
    markets: ["Industrial", "Commercial", "Residential"],
    tagline: "Surfaces that power large projects",
    imageAlt: "Finished industrial concrete floor",
    imagePlaceholder: "Photography coming soon",
    scrollHint: "Scroll to see more",
  },

  story: {
    kicker: "Our story",
    title: "Experience That Builds Trust",
    body: "Since 2009, Concrete Coatings Solutions has provided specialized solutions for concrete surfaces, helping each client identify the system best suited to their needs and budget.",
    cta: "Learn More About Us",
    sinceLabel: "Since",
    highlights: [
      "Industrial",
      "Commercial",
      "Residential",
      "Specialized solutions",
    ],
    imageAlt: "The Concrete Coatings Solutions team on site",
    imagePlaceholder: "Photography coming soon",
  },

  solutions: {
    kicker: "Our solutions",
    title: "Specialized systems for every surface",
    viewAll: "View all services",
    imagePlaceholder: "Photography coming soon",
    categories: {
      polishing: "Concrete Polishing",
      floors: "Floor Coatings",
      waterproofing: "Waterproofing",
      specialized: "Specialized Coatings",
      repair: "Concrete Repair",
      maintenance: "Existing System Maintenance",
    },
  },

  industries: {
    heading: "Industries we serve",
    imagePlaceholder: "Photography coming soon",
    segments: {
      industrial: "Industrial",
      commercial: "Commercial",
      residential: "Residential",
      specialized: "Specialized Applications",
    },
  },

  work: {
    kicker: "Our work",
    title: "Results That Speak for Themselves",
    viewMore: "View more projects",
    filtersLabel: "Filter projects by category",
    filters: {
      all: "All",
      industrial: "Industrial",
      commercial: "Commercial",
      residential: "Residential",
      specialized: "Specialized",
    },
    comingSoon: "Coming soon",
    imagePlaceholder: "Photography coming soon",
    emptyState: "No projects in this category yet.",
  },

  applications: {
    kicker: "Specialized applications",
    title: "Systems for Specific Needs",
    viewAll: "View all solutions",
    prev: "Previous",
    next: "Next",
    carouselLabel: "Specialized applications",
    imagePlaceholder: "Photography coming soon",
  },

  ethos: {
    kicker: "Mission, vision and values",
    title: "What Guides Us",
    learnMore: "Learn more",
    close: "Close",
    imagePlaceholder: "Photography coming soon",
    mission: {
      title: "Mission",
      body: "Guide our clients toward the system best suited to their needs and budget, offering a highly qualified range of products from which to choose.",
    },
    vision: {
      title: "Vision",
      body: "To be a trusted company in floor coating systems, recognized for both the quality of our products and the professionalism and training of our personnel.",
    },
    values: {
      title: "Values",
      items: [
        "Service Attitude",
        "Innovation",
        "Efficiency",
        "Responsibility",
        "Honesty",
      ],
    },
  },

  clients: {
    kicker: "Clients",
    title: "Companies That Have Trusted Us",
    carouselLabel: "Clients",
    prev: "Previous",
    next: "Next",
  },

  brands: {
    kicker: "Suppliers and brands",
    title: "Technology and Materials",
    carouselLabel: "Suppliers and brands",
    prev: "Previous",
    next: "Next",
  },

  cta: {
    title: "Have a Project?",
    body: "Let's talk about the needs of your facility.",
    call: "Call Us",
    whatsappMessage: "Hi, I'd like to request a quote for my project.",
    imageAlt: "Coating being applied to a concrete floor",
    imagePlaceholder: "Photography coming soon",
  },

  quoteForm: {
    kicker: "Request a quote",
    title: "Tell Us About Your Project",
    notConnectedNote:
      "Online submission for this form is not connected to a server yet.",
    optionalLabel: "(optional)",
    fields: {
      name: "Name",
      company: "Company",
      phone: "Phone",
      email: "Email",
      projectType: "Project type",
      message: "Message",
    },
    projectTypePlaceholder: "Select an option",
    projectTypeOptions: [
      "Industrial",
      "Commercial",
      "Residential",
      "Specialized application",
      "Maintenance or repair",
      "Other",
    ],
    attachmentsNote: "Attach photos — coming soon",
    submit: "Send request",
    errors: {
      required: "This field is required.",
      email: "Enter a valid email address.",
    },
    unsentTitle: "Form ready, but it can't be sent yet",
    unsentBody:
      "Online submission for this form is not connected yet. For now, please contact us directly.",
    altChannels: "Direct contact channels:",
  },

  home: {
    kicker: "Solutions for concrete surfaces and floors",
    title: "More sections on the way",
    subtitle: "About and Contact are built in the next phases.",
    body: "There is plenty of space below the hero: the following sections are not compressed.",
    statusNote: "You are viewing the English version (/en).",
  },

  notFound: {
    title: "Page not found",
    body: "The page you are looking for does not exist or is not available yet.",
    back: "Back to home",
  },
};
