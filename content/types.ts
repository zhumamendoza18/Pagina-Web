/**
 * Shape of a language dictionary.
 *
 * Both content/es/index.ts and content/en/index.ts must satisfy this type,
 * so the two languages can never drift out of sync. Components receive the
 * translated strings from here — they are never hard-coded in the components
 * themselves.
 */
export interface Dictionary {
  /** Native name of this language, e.g. "Español" / "English". */
  localeName: string;

  /** Primary navigation labels. */
  nav: {
    home: string;
    solutions: string;
    industries: string;
    projects: string;
    about: string;
    contact: string;
  };

  /** Reusable call-to-action / button labels. */
  actions: {
    requestQuote: string;
    whatsapp: string;
    call: string;
    email: string;
    viewProjects: string;
    contact: string;
    learnMore: string;
  };

  /** Accessibility / chrome strings for the header. */
  header: {
    skipToContent: string;
    openMenu: string;
    closeMenu: string;
    languageLabel: string;
    brandHome: string;
    primaryNav: string;
  };

  /** Footer strings. */
  footer: {
    tagline: string;
    /** Prefix before the founding year, e.g. "Desde" / "Since". */
    sincePrefix: string;
    legalNameLabel: string;
    navTitle: string;
    /** Label for the Mission/Vision/Values link in the footer. */
    ethosLink: string;
    contactTitle: string;
    /** Shown while no contact details are configured yet. */
    contactPending: string;
    rights: string;
    /** Accessible label for the back-to-top button. */
    backToTop: string;
  };

  /** Hero — the first screen. */
  hero: {
    /** Headline rendered as two lines. */
    titleLines: [string, string];
    /** Prefix before the founding year; shown uppercase, e.g. "Desde". */
    sinceLabel: string;
    /** Market tags, joined with a middot in the UI. */
    markets: string[];
    /** Small secondary phrase shown above the headline. */
    tagline: string;
    /** Alt text for the hero photo (used once a real image exists). */
    imageAlt: string;
    /** Caption shown while the hero image is still a placeholder. */
    imagePlaceholder: string;
    /** Accessible label for the scroll-down cue. */
    scrollHint: string;
  };

  /** "Our story" section — history and experience, right after the hero. */
  story: {
    kicker: string;
    title: string;
    /** One short paragraph. Keep it to a single paragraph. */
    body: string;
    cta: string;
    /** Prefix before the founding year for the first highlight chip. */
    sinceLabel: string;
    /** Non-numeric highlight chips (no invented statistics). */
    highlights: string[];
    imageAlt: string;
    imagePlaceholder: string;
  };

  /** "Our solutions" section on the Home — four main families, visual cards. */
  solutions: {
    kicker: string;
    title: string;
    /** Top-right button. */
    viewAll: string;
    /** Caption while a card image is still a placeholder. */
    imagePlaceholder: string;
    /** Category headings, keyed by SolutionCategory.titleKey. */
    categories: {
      polishing: string;
      floors: string;
      waterproofing: string;
      specialized: string;
      repair: string;
      maintenance: string;
      resinous: string;
      jointSealing: string;
      marking: string;
      mortars: string;
    };
  };

  /**
   * "Solutions for demanding environments" — compact, image-first band on the
   * Home. Four tiles only (ESD / high traffic / chemical / self-leveling).
   */
  demanding: {
    kicker: string;
    title: string;
    /** Link to the technical solutions index. */
    cta: string;
    imagePlaceholder: string;
    items: {
      esd: string;
      highTraffic: string;
      chemical: string;
      selfLeveling: string;
    };
  };

  /** /soluciones — /solutions index page (one interactive section per family). */
  solutionsPage: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    /** One short lead sentence. No long technical articles in this phase. */
    intro: string;
    /** Label above the subtopic chips of each family. */
    includesLabel: string;
    imagePlaceholder: string;
    /** Action over the album cover. */
    viewProcess: string;
    /** Section sub-headings for the selected subtopic. */
    whatIsIt: string;
    benefitsLabel: string;
    idealForLabel: string;
    /** Neutral text shown while a subtopic has no approved summary. */
    summaryPending: string;
    /** Accessible label for the subtopic button group. */
    topicsGroupLabel: string;
    /** Lightbox / album strings. */
    gallery: {
      label: string;
      close: string;
      prev: string;
      next: string;
    };
  };

  /** /nosotros — /about page. */
  aboutPage: {
    metaTitle: string;
    metaDescription: string;
    kicker: string;
    title: string;
    /** Short lead paragraph. */
    intro: string;
    /** Three short blocks — no verbatim copy of the corporate document. */
    blocks: {
      origin: { title: string; body: string };
      experience: { title: string; body: string };
      support: { title: string; body: string };
    };
    /** Prefix + year line, e.g. "Desde 2009". */
    sinceLabel: string;
    ethosKicker: string;
    ethosTitle: string;
    imageAlt: string;
    imagePlaceholder: string;
  };

  /** "Industries we serve" section — four full-photo cards. */
  industries: {
    /** Section heading (rendered uppercase). */
    heading: string;
    /** Caption while a card image is still a placeholder. */
    imagePlaceholder: string;
    /** Segment names, keyed by IndustrySegment.titleKey. */
    segments: {
      industrial: string;
      commercial: string;
      residential: string;
      specialized: string;
    };
  };

  /** "Our work" section — editorial gallery with a category filter. */
  work: {
    kicker: string;
    title: string;
    /** Button below the gallery. */
    viewMore: string;
    /** Accessible label for the filter button group. */
    filtersLabel: string;
    /** Filter chip labels, keyed by ProjectFilter. */
    filters: {
      all: string;
      industrial: string;
      commercial: string;
      residential: string;
      specialized: string;
    };
    /** Small tag on placeholder tiles (no real project yet). */
    comingSoon: string;
    /** Caption while a tile image is still a placeholder. */
    imagePlaceholder: string;
    /** Shown when a filter matches nothing. */
    emptyState: string;
  };

  /** Secondary "specialized applications" section — horizontal carousel. */
  applications: {
    kicker: string;
    title: string;
    /** Link to the full solutions index. */
    viewAll: string;
    /** Accessible labels for the carousel controls. */
    prev: string;
    next: string;
    carouselLabel: string;
    imagePlaceholder: string;
  };

  /** "Mission, vision & values" section — three cards, each opens a modal. */
  ethos: {
    kicker: string;
    title: string;
    /** Card button. */
    learnMore: string;
    /** Per-card link labels below each image in the "what guides us" section. */
    exploreMission: string;
    exploreVision: string;
    exploreValues: string;
    /** Modal close button. */
    close: string;
    imagePlaceholder: string;
    mission: { title: string; body: string };
    vision: { title: string; body: string };
    values: { title: string; items: string[] };
  };

  /** "Clients" section — hidden until site.flags.showClients and real data. */
  clients: {
    kicker: string;
    title: string;
    carouselLabel: string;
    prev: string;
    next: string;
  };

  /** "Suppliers / brands" section — hidden until site.flags.showBrands and data. */
  brands: {
    kicker: string;
    title: string;
    carouselLabel: string;
    prev: string;
    next: string;
  };

  /** End-of-page conversion band (photo + navy overlay + 3 buttons). */
  cta: {
    title: string;
    body: string;
    call: string;
    /** Prefilled WhatsApp message. */
    whatsappMessage: string;
    imageAlt: string;
    imagePlaceholder: string;
  };

  /** Quote request form. */
  quoteForm: {
    kicker: string;
    title: string;
    /** Always-visible notice that submission is not wired to a backend. */
    notConnectedNote: string;
    optionalLabel: string;
    fields: {
      name: string;
      company: string;
      phone: string;
      email: string;
      projectType: string;
      message: string;
    };
    projectTypePlaceholder: string;
    projectTypeOptions: string[];
    /** Placeholder for the future "attach photos" field. */
    attachmentsNote: string;
    submit: string;
    errors: {
      required: string;
      email: string;
    };
    /** Shown after a valid submit — no fake "sent" confirmation. */
    unsentTitle: string;
    unsentBody: string;
    altChannels: string;
  };

  /** Short band under the hero while later sections are not built yet. */
  home: {
    kicker: string;
    title: string;
    subtitle: string;
    body: string;
    /** Small note confirming which language is active. */
    statusNote: string;
  };

  /** Not-found page. */
  notFound: {
    title: string;
    body: string;
    back: string;
  };
}
