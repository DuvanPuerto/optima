/**
 * Contenido estático de la aplicación.
 * Editar aquí para actualizar textos, servicios, testimonios, etc.
 */

// ── Información de contacto ──────────────────────────────────────────────────
export const CONTACT_INFO = {
  whatsapp: {
    number: '573205575139', // Número sin + ni espacios
    message: 'Hola Angie, me gustaría recibir asesoría contable y financiera.',
  },
  email: 'angie.cespedes@est.uexternado.edu.co',
  phone: '+57 320 557 5139',
  address: 'Paipa, Boyacá',
  instagram: 'https://instagram.com/optimabyangie',
  linkedin: 'https://linkedin.com/in/angiecespedes',
  facebook: 'https://facebook.com/optimabyangie',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31746.4!2d-73.1058!3d5.7807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e6a4e0a0a0a0a0a%3A0x0!2sPaipa%2C%20Boyac%C3%A1!5e0!3m2!1ses!2sco!4v1',
} as const;

// ── Formspree ────────────────────────────────────────────────────────────────
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meepynno';

// ── Hero ─────────────────────────────────────────────────────────────────────
export const HERO_CONTENT = {
  badge: 'Contadora Pública Certificada',
  headline: 'Tu futuro financiero,',
  headlineAccent: 'bien construido.',
  subtitle:
    'Asesoría contable y financiera personalizada para personas naturales, emprendedores y empresas. Resultados claros, estrategia sólida.',
  ctaPrimary: 'Chatear por WhatsApp',
  ctaSecondary: 'Ver mis servicios',
};

// ── Estadísticas ─────────────────────────────────────────────────────────────
export const STATS = [
  { value: 6, suffix: '+ años', label: 'De experiencia', icon: 'fa-solid fa-award' },
  {
    value: 3,
    suffix: ' sectores',
    label: 'Comercial, industrial y servicios',
    icon: 'fa-solid fa-industry',
  },
  { value: 100, suffix: '+', label: 'Clientes asesorados', icon: 'fa-solid fa-users' },
  { value: 5, suffix: ' software', label: 'Contables dominados', icon: 'fa-solid fa-laptop-code' },
];

// ── Servicios ────────────────────────────────────────────────────────────────
export const SERVICES = [
  {
    icon: 'fa-solid fa-chart-bar',
    title: 'Contabilidad Integral',
    description:
      'Registro, clasificación y análisis de toda la información financiera de tu empresa. Estados financieros claros y oportunos.',
    highlights: ['Registros contables', 'Estados financieros', 'Conciliaciones bancarias'],
  },
  {
    icon: 'fa-solid fa-file-invoice',
    title: 'Declaración de Renta',
    description:
      'Preparación y presentación de declaraciones de renta para personas naturales y jurídicas ante la DIAN.',
    highlights: ['Personas naturales', 'Personas jurídicas', 'Grandes patrimonioss'],
  },
  {
    icon: 'fa-solid fa-scale-balanced',
    title: 'Asesoría Tributaria',
    description:
      'Planificación fiscal estratégica para reducir tu carga tributaria de manera legal y optimizar el pago de impuestos.',
    highlights: ['Planeación fiscal', 'Obligaciones tributarias', 'Régimen simple'],
  },
  {
    icon: 'fa-solid fa-chart-line',
    title: 'Planeación Financiera',
    description:
      'Evaluación de tu situación financiera y diseño de estrategias de inversión, ahorro y crecimiento patrimonial.',
    highlights: ['Presupuestos', 'Análisis financiero', 'Proyecciones'],
  },
  {
    icon: 'fa-solid fa-users-gear',
    title: 'Nómina y RRHH',
    description:
      'Gestión completa de nómina, liquidación de seguridad social, parafiscales y prestaciones sociales.',
    highlights: ['Liquidación de nómina', 'Seguridad social', 'Retiro y liquidaciones'],
  },
  {
    icon: 'fa-solid fa-landmark',
    title: 'Constitución de Empresas',
    description:
      'Acompañamiento completo para la creación y formalización de empresas: SAS, LTDA, SA y más.',
    highlights: ['Registro cámara', 'RUT y NIT', 'Permisos y licencias'],
  },
];

// ── Sobre Angie ──────────────────────────────────────────────────────────────
export const ABOUT_CONTENT = {
  name: 'Angie Paola Céspedes Portela',
  title: 'Contadora Pública · Magíster en Contabilidad y Tributación',
  bio: [
    'Soy Contadora Pública con más de 6 años de experiencia en los sectores comercial, industrial y de servicios. Especialista en estados financieros bajo NIIF, planeación financiera, gestión presupuestal y cumplimiento tributario.',
    'Actualmente lidero los procesos contables, financieros y administrativos en Social Solar S.A.S., mientras brindo consultoría independiente a personas naturales y jurídicas en todo el país.',
  ],
  credentials: [
    'Magíster en Contabilidad y Tributación — Universidad Externado de Colombia (2026)',
    'Contadora Pública — Universidad Antonio Nariño (2023)',
    'Tecnóloga en Contabilidad Financiera — SENA (2018)',
    'Diplomado en Finanzas y Tributación (2022)',
    'Certificaciones en NIIF para Pymes, SG-SST y Recursos Humanos',
  ],
  values: [
    { icon: 'fa-solid fa-bullseye', title: 'Precisión', desc: 'Cada cifra importa' },
    { icon: 'fa-solid fa-lock', title: 'Confidencialidad', desc: 'Tu información, segura' },
    { icon: 'fa-solid fa-people-group', title: 'Liderazgo', desc: 'Coordino equipos de trabajo' },
    { icon: 'fa-solid fa-handshake', title: 'Compromiso', desc: 'Tu éxito es el mío' },
  ],
  tools: [
    { label: 'Siigo' },
    { label: 'World Office' },
    { label: 'Helisa' },
    { label: 'Excel Avanzado' },
    { label: 'Power BI' },
    { label: 'DIAN' },
    { label: 'SECOP' },
    { label: 'PILA' },
    { label: 'IA Financiera' },
    { label: 'Power BI' },
    { label: 'Google Sheets' },
    { label: 'ClickUp' },
  ],
};

// ── Testimonios ──────────────────────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    name: 'Carlos Martínez',
    role: 'Propietario — Restaurante El Sabor',
    rating: 5,
    text: 'Angie nos ayudó a organizar toda la contabilidad del restaurante y optimizamos el pago de impuestos. Excelente profesional.',
    initials: 'CM',
  },
  {
    name: 'Laura González',
    role: 'Emprendedora — Tienda Online',
    rating: 5,
    text: 'Gracias a su asesoría logré formalizar mi negocio y declarar renta sin complicaciones. La recomiendo 100%.',
    initials: 'LG',
  },
  {
    name: 'Diego Ramírez',
    role: 'Gerente — Constructora DR',
    rating: 5,
    text: 'La planeación tributaria que diseñó para nuestra empresa nos generó ahorros significativos. Trabajo impecable.',
    initials: 'DR',
  },
  {
    name: 'María Fernández',
    role: 'Profesional independiente',
    rating: 5,
    text: 'Nunca pensé que mi declaración de renta pudiera ser tan sencilla. Angie lo explicó todo con paciencia y claridad.',
    initials: 'MF',
  },
];

// ── Recursos Descargables ────────────────────────────────────────────────────
export const RESOURCES = [
  {
    icon: 'fa-solid fa-file-pdf',
    title: 'Checklist: Documentos para Declaración de Renta',
    description:
      'Lista completa de documentos que necesitas para tu declaración de renta personas naturales.',
    tag: 'Gratuito',
    color: 'primary',
  },
  {
    icon: 'fa-solid fa-book-open',
    title: 'Guía: Régimen Simple de Tributación',
    description: '¿Conviene el régimen simple? Aprende los beneficios, límites y cómo inscribirte.',
    tag: 'Gratuito',
    color: 'accent',
  },
  {
    icon: 'fa-solid fa-table-cells',
    title: 'Plantilla: Presupuesto Personal en Excel',
    description: 'Plantilla lista para usar para controlar tus finanzas personales mes a mes.',
    tag: 'Gratuito',
    color: 'secondary',
  },
  {
    icon: 'fa-solid fa-building',
    title: 'Guía: Cómo Constituir tu SAS en Colombia',
    description: 'Paso a paso para crear tu Sociedad por Acciones Simplificada de forma correcta.',
    tag: 'Gratuito',
    color: 'primary',
  },
];

// ── Hoja de Vida ─────────────────────────────────────────────────────────────
export const RESUME_CONTENT = {
  education: [
    {
      period: '2024 – 2026',
      institution: 'Universidad Externado de Colombia',
      degree: 'Maestría en Contabilidad y Tributación',
      detail:
        'Graduada en abril de 2026. Profundización en tributación avanzada, estándares internacionales y estrategia financiera empresarial.',
    },
    {
      period: '2019 – 2023',
      institution: 'Universidad Antonio Nariño',
      degree: 'Contaduría Pública',
      detail:
        'Formación integral en contabilidad, finanzas, auditoría y derecho tributario colombiano.',
    },
    {
      period: '2016 – 2018',
      institution: 'SENA',
      degree: 'Tecnología en Contabilidad Financiera',
      detail: 'Base técnica en procesos contables, nómina y manejo de software especializado.',
    },
    {
      period: '2022',
      institution: 'Institución certificadora',
      degree: 'Diplomado en Finanzas y Tributación',
      detail:
        'Actualización en normativa tributaria, planeación fiscal y finanzas corporativas para el entorno colombiano.',
    },
  ],
  experience: [
    {
      period: 'Jul. 2020 – Presente',
      company: 'Social Solar S.A.S.',
      role: 'Jefa de Contabilidad, Financiera y Administrativa',
      detail:
        'Lidera procesos tributarios, gestión de tesorería y estados financieros bajo NIIF. Toma de decisiones estratégicas, coordinación de equipo y presentación de reportes a gerencia.',
    },
    {
      period: 'Continuo',
      company: 'Asesoría Independiente',
      role: 'Consultora Contable y Tributaria',
      detail:
        'Consultoría contable y tributaria para personas naturales y jurídicas: declaraciones fiscales, planeación tributaria y acompañamiento en procesos con la DIAN y Cámara de Comercio.',
    },
    {
      period: 'Dic. 2018 – Jun. 2020',
      company: 'Industrias Chassis Truck S.A.S.',
      role: 'Analista Contable y Financiera',
      detail:
        'Manejo integral de impuestos, contabilidad de costos y reportes a la Superintendencia de Sociedades. Análisis financiero y conciliaciones.',
    },
  ],
};

// ── FAQ ───────────────────────────────────────────────────────────────────────
export const FAQ_ITEMS = [
  {
    question: '¿Cuánto cuesta una asesoría inicial?',
    answer:
      'La primera consulta de 30 minutos es completamente gratuita. En esa sesión evaluamos tu situación y te damos una propuesta personalizada sin compromiso.',
  },
  {
    question: '¿Puedo declarar renta si soy trabajador independiente?',
    answer:
      'Sí, los trabajadores independientes (freelancers, contratistas) también deben declarar renta si superan los topes establecidos por la DIAN. Te ayudamos a hacerlo correctamente.',
  },
  {
    question: '¿Qué documentos necesito para formalizar mi empresa?',
    answer:
      'Para constituir una SAS necesitas: documento de identidad, acta de constitución, estatutos sociales, registro en Cámara de Comercio, RUT y apertura de cuenta bancaria. Te guiamos en cada paso.',
  },
  {
    question: '¿Trabajas con empresas de otros departamentos o ciudades?',
    answer:
      'Sí, atendemos clientes en todo Colombia de manera virtual. Utilizamos herramientas digitales seguras para compartir documentos y realizar reuniones por videollamada.',
  },
  {
    question: '¿Cómo garantizan la confidencialidad de mi información?',
    answer:
      'Trabajamos bajo estrictos protocolos de confidencialidad y todos los documentos se manejan mediante plataformas encriptadas. La información de nuestros clientes nunca es compartida con terceros.',
  },
  {
    question: '¿Qué es el Régimen Simple y me conviene?',
    answer:
      'El Régimen Simple de Tributación unifica varios impuestos en uno solo y ofrece tarifas más bajas para pequeños y medianos empresarios. Si tienes ingresos brutos anuales menores a 100.000 UVT, podría convenirte. Te hacemos el análisis personalizado.',
  },
];
