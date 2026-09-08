import type { Dictionary } from "@/content/types";

/** Spanish dictionary. */
export const es: Dictionary = {
  localeName: "Español",

  nav: {
    home: "Inicio",
    solutions: "Soluciones",
    industries: "Industrias",
    projects: "Proyectos",
    about: "Nosotros",
    contact: "Contacto",
  },

  actions: {
    requestQuote: "Solicitar cotización",
    whatsapp: "WhatsApp",
    call: "Llamar",
    email: "Enviar correo",
    viewProjects: "Ver proyectos",
    contact: "Contactar",
    learnMore: "Conocer más",
  },

  header: {
    skipToContent: "Saltar al contenido",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    languageLabel: "Cambiar idioma",
    brandHome: "Concrete Coatings Solutions — Ir al inicio",
    primaryNav: "Navegación principal",
  },

  footer: {
    tagline: "Expertos en Sellos de Pisos",
    sincePrefix: "Desde",
    legalNameLabel: "Razón social",
    navTitle: "Navegación",
    ethosLink: "Misión, Visión y Valores",
    contactTitle: "Contacto",
    contactPending: "Datos de contacto próximamente.",
    rights: "Todos los derechos reservados.",
    backToTop: "Volver al inicio",
  },

  hero: {
    titleLines: ["Soluciones para", "pisos de concreto"],
    sinceLabel: "Desde",
    markets: ["Industrial", "Comercial", "Residencial"],
    tagline: "Superficies que impulsan grandes proyectos",
    imageAlt: "Piso industrial de concreto terminado",
    imagePlaceholder: "Fotografía próximamente",
    scrollHint: "Desplázate para ver más",
  },

  story: {
    kicker: "Nuestra historia",
    title: "Experiencia que construye confianza",
    body: "Desde 2009, Concrete Coatings Solutions ofrece soluciones especializadas para superficies de concreto, orientando a cada cliente hacia el sistema adecuado para sus necesidades y presupuesto.",
    cta: "Conoce más sobre nosotros",
    sinceLabel: "Desde",
    highlights: [
      "Industrial",
      "Comercial",
      "Residencial",
      "Soluciones especializadas",
    ],
    imageAlt: "Equipo de Concrete Coatings Solutions en obra",
    imagePlaceholder: "Fotografía próximamente",
  },

  solutions: {
    kicker: "Nuestras soluciones",
    title: "Sistemas especializados para cada superficie",
    viewAll: "Ver todos los servicios",
    imagePlaceholder: "Fotografía próximamente",
    categories: {
      polishing: "Abrillantado de concreto",
      floors: "Recubrimientos para pisos",
      waterproofing: "Impermeabilización",
      specialized: "Recubrimientos especializados",
      repair: "Reparación de concreto",
      maintenance: "Mantenimiento de sistemas existentes",
    },
  },

  industries: {
    heading: "Industrias que atendemos",
    imagePlaceholder: "Fotografía próximamente",
    segments: {
      industrial: "Industrial",
      commercial: "Comercial",
      residential: "Residencial",
      specialized: "Aplicaciones especializadas",
    },
  },

  work: {
    kicker: "Nuestro trabajo",
    title: "Resultados que hablan por nosotros",
    viewMore: "Ver más proyectos",
    filtersLabel: "Filtrar proyectos por categoría",
    filters: {
      all: "Todos",
      industrial: "Industrial",
      commercial: "Comercial",
      residential: "Residencial",
      specialized: "Especializados",
    },
    comingSoon: "Próximamente",
    imagePlaceholder: "Fotografía próximamente",
    emptyState: "No hay proyectos en esta categoría por ahora.",
  },

  applications: {
    kicker: "Aplicaciones especializadas",
    title: "Sistemas para necesidades específicas",
    viewAll: "Ver todas las soluciones",
    prev: "Anterior",
    next: "Siguiente",
    carouselLabel: "Aplicaciones especializadas",
    imagePlaceholder: "Fotografía próximamente",
  },

  ethos: {
    kicker: "Misión, visión y valores",
    title: "Lo que nos guía",
    learnMore: "Conocer más",
    close: "Cerrar",
    imagePlaceholder: "Fotografía próximamente",
    mission: {
      title: "Misión",
      body: "Orientar a nuestros clientes hacia el sistema adecuado a sus necesidades y presupuesto, ofreciendo la mejor y más calificada gama de productos para su elección.",
    },
    vision: {
      title: "Visión",
      body: "Ser una empresa confiable de sistemas de recubrimiento de pisos, debido tanto a la calidad de nuestros productos como al profesionalismo y capacitación de nuestro personal.",
    },
    values: {
      title: "Valores",
      items: [
        "Actitud de Servicio",
        "Innovación",
        "Eficiencia",
        "Responsabilidad",
        "Honestidad",
      ],
    },
  },

  clients: {
    kicker: "Clientes",
    title: "Empresas que han confiado en nosotros",
    carouselLabel: "Clientes",
    prev: "Anterior",
    next: "Siguiente",
  },

  brands: {
    kicker: "Proveedores y marcas",
    title: "Tecnología y materiales",
    carouselLabel: "Proveedores y marcas",
    prev: "Anterior",
    next: "Siguiente",
  },

  cta: {
    title: "¿Tienes un proyecto?",
    body: "Hablemos sobre las necesidades de tu instalación.",
    call: "Llamar",
    whatsappMessage:
      "Hola, me gustaría solicitar una cotización para mi proyecto.",
    imageAlt: "Aplicación de recubrimiento sobre un piso de concreto",
    imagePlaceholder: "Fotografía próximamente",
  },

  quoteForm: {
    kicker: "Solicitar cotización",
    title: "Cuéntanos sobre tu proyecto",
    notConnectedNote:
      "El envío en línea de este formulario todavía no está conectado a un servidor.",
    optionalLabel: "(opcional)",
    fields: {
      name: "Nombre",
      company: "Empresa",
      phone: "Teléfono",
      email: "Correo",
      projectType: "Tipo de proyecto",
      message: "Mensaje",
    },
    projectTypePlaceholder: "Selecciona una opción",
    projectTypeOptions: [
      "Industrial",
      "Comercial",
      "Residencial",
      "Aplicación especializada",
      "Mantenimiento o reparación",
      "Otro",
    ],
    attachmentsNote: "Adjuntar fotografías — disponible próximamente",
    submit: "Enviar solicitud",
    errors: {
      required: "Este campo es obligatorio.",
      email: "Introduce un correo electrónico válido.",
    },
    unsentTitle: "Formulario listo, pero aún no se puede enviar",
    unsentBody:
      "El envío en línea de este formulario aún no está conectado. Por ahora, contáctanos directamente.",
    altChannels: "Canales de contacto directo:",
  },

  home: {
    kicker: "Soluciones para superficies y pisos de concreto",
    title: "Más secciones en camino",
    subtitle:
      "Nosotros y Contacto se construyen en las próximas fases.",
    body: "Debajo del hero hay espacio de sobra: las siguientes secciones no se comprimen.",
    statusNote: "Estás viendo la versión en español (/es).",
  },

  notFound: {
    title: "Página no encontrada",
    body: "La página que buscas no existe o todavía no está disponible.",
    back: "Volver al inicio",
  },
};
