import { Injectable, signal } from '@angular/core';
import { 
  CompanyInfo, 
  Service, 
  Product, 
  Promotions 
} from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Datos de la empresa hardcoded
  private readonly companyData: CompanyInfo = {
    name: "SolucionesGM",
    fullName: "Soluciones GM - Desarrollo y Tecnología",
    tagline: "Transformando ideas en soluciones tecnológicas",
    description: "Somos una empresa líder en desarrollo de software y soluciones tecnológicas innovadoras. Ofrecemos servicios de desarrollo web, aplicaciones móviles, consultoría IT y transformación digital para empresas de todos los tamaños.",
    mission: "Proporcionar soluciones tecnológicas de vanguardia que impulsen el crecimiento y la eficiencia de nuestros clientes",
    vision: "Ser la empresa de referencia en innovación tecnológica y desarrollo de software en la región",
    founded: "2020",
    logo: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='95' fill='url(%23a)'/%3E%3Ctext x='100' y='125' font-family='Arial' font-size='80' font-weight='bold' text-anchor='middle' fill='white'%3EGM%3C/text%3E%3C/svg%3E",
    logoSmall: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='95' fill='url(%23a)'/%3E%3Ctext x='100' y='125' font-family='Arial' font-size='80' font-weight='bold' text-anchor='middle' fill='white'%3EGM%3C/text%3E%3C/svg%3E",
    logoMedium: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='95' fill='url(%23a)'/%3E%3Ctext x='100' y='125' font-family='Arial' font-size='80' font-weight='bold' text-anchor='middle' fill='white'%3EGM%3C/text%3E%3C/svg%3E",
    logoLarge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='256' height='256' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='95' fill='url(%23a)'/%3E%3Ctext x='100' y='125' font-family='Arial' font-size='80' font-weight='bold' text-anchor='middle' fill='white'%3EGM%3C/text%3E%3C/svg%3E",
    logoXLarge: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 200 200'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Ccircle cx='100' cy='100' r='95' fill='url(%23a)'/%3E%3Ctext x='100' y='125' font-family='Arial' font-size='80' font-weight='bold' text-anchor='middle' fill='white'%3EGM%3C/text%3E%3C/svg%3E",
    contact: {
      email: "contacto@solucionesgm.com",
      phone: "+34 123 456 789",
      whatsapp: "+34123456789",
      address: "Calle Tecnología 123, 28001 Madrid, España"
    },
    social: {
      facebook: "https://facebook.com/solucionesgm",
      twitter: "https://twitter.com/solucionesgm",
      linkedin: "https://linkedin.com/company/solucionesgm",
      instagram: "https://instagram.com/solucionesgm",
      github: "https://github.com/solucionesgm"
    },
    seo: {
      keywords: [
        "desarrollo de software",
        "aplicaciones web",
        "aplicaciones móviles",
        "consultoría IT",
        "transformación digital",
        "desarrollo a medida",
        "soluciones tecnológicas",
        "programación",
        "software empresarial"
      ],
      metaDescription: "SolucionesGM - Empresa líder en desarrollo de software y soluciones tecnológicas. Desarrollo web, apps móviles, consultoría IT y transformación digital.",
      ogImage: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1200' height='630' viewBox='0 0 1200 630'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' style='stop-color:%232563eb'/%3E%3Cstop offset='100%25' style='stop-color:%237c3aed'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1200' height='630' fill='url(%23a)'/%3E%3Ctext x='600' y='350' font-family='Arial' font-size='120' font-weight='bold' text-anchor='middle' fill='white'%3ESolucionesGM%3C/text%3E%3C/svg%3E"
    }
  };

  // Servicios hardcoded
  private readonly servicesData: Service[] = [
    {
      id: "desarrollo-web",
      title: "Desarrollo Web",
      shortDescription: "Sitios web modernos y responsive",
      description: "Creamos sitios web y aplicaciones web de alta calidad utilizando las últimas tecnologías.",
      icon: "🌐",
      image: "",
      features: [
        "Diseño responsive para todos los dispositivos",
        "Optimización SEO y velocidad de carga",
        "Progressive Web Apps (PWA)",
        "Integración con APIs y servicios",
        "Panel de administración personalizado",
        "Hosting y mantenimiento"
      ],
      technologies: ["Angular", "React", "Vue.js", "Node.js", "TypeScript"],
      pricing: { from: 2500, currency: "EUR", unit: "proyecto" },
      featured: true
    },
    {
      id: "desarrollo-movil",
      title: "Desarrollo Móvil",
      shortDescription: "Apps nativas e híbridas",
      description: "Desarrollamos aplicaciones móviles nativas para iOS y Android.",
      icon: "📱",
      image: "",
      features: [
        "Apps nativas iOS y Android",
        "Desarrollo híbrido con React Native/Flutter",
        "Integración con servicios cloud",
        "Notificaciones push",
        "Pagos in-app",
        "Publicación en stores"
      ],
      technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
      pricing: { from: 5000, currency: "EUR", unit: "proyecto" },
      featured: true
    },
    {
      id: "consultoria-it",
      title: "Consultoría IT",
      shortDescription: "Asesoramiento tecnológico estratégico",
      description: "Ofrecemos servicios de consultoría tecnológica para ayudar a su empresa.",
      icon: "💼",
      image: "",
      features: [
        "Auditoría de sistemas actuales",
        "Arquitectura de software",
        "Estrategia de transformación digital",
        "Optimización de procesos",
        "Seguridad y compliance",
        "Gestión de proyectos tecnológicos"
      ],
      technologies: ["AWS", "Azure", "Google Cloud", "DevOps", "Kubernetes"],
      pricing: { from: 1500, currency: "EUR", unit: "mes" },
      featured: false
    },
    {
      id: "ecommerce",
      title: "E-commerce",
      shortDescription: "Tiendas online profesionales",
      description: "Desarrollamos tiendas online completas y personalizadas.",
      icon: "🛒",
      image: "",
      features: [
        "Catálogo de productos avanzado",
        "Pasarelas de pago integradas",
        "Sistema de gestión de pedidos",
        "Integración con ERP/CRM",
        "Marketing y analíticas",
        "App móvil complementaria"
      ],
      technologies: ["Shopify", "WooCommerce", "Magento", "Custom Solutions"],
      pricing: { from: 3500, currency: "EUR", unit: "proyecto" },
      featured: true
    },
    {
      id: "software-medida",
      title: "Software a Medida",
      shortDescription: "Soluciones personalizadas",
      description: "Desarrollamos software a medida completamente personalizado.",
      icon: "⚙️",
      image: "",
      features: [
        "Análisis de requerimientos",
        "Diseño de arquitectura personalizada",
        "Desarrollo ágil con sprints",
        "Integración con sistemas existentes",
        "Capacitación de usuarios",
        "Soporte y evolución continua"
      ],
      technologies: ["Java", "Python", ".NET", "PostgreSQL", "MongoDB"],
      pricing: { from: 8000, currency: "EUR", unit: "proyecto" },
      featured: false
    },
    {
      id: "inteligencia-artificial",
      title: "Inteligencia Artificial",
      shortDescription: "IA y Machine Learning",
      description: "Implementamos soluciones de inteligencia artificial y machine learning.",
      icon: "🤖",
      image: "",
      features: [
        "Análisis predictivo",
        "Procesamiento de lenguaje natural",
        "Visión por computadora",
        "Chatbots inteligentes",
        "Automatización de procesos",
        "Análisis de datos avanzado"
      ],
      technologies: ["TensorFlow", "PyTorch", "OpenAI", "Scikit-learn", "Python"],
      pricing: { from: 6000, currency: "EUR", unit: "proyecto" },
      featured: false
    }
  ];

  // Productos hardcoded
  private readonly productsData: Product[] = [
    {
      id: "pack-startup",
      name: "Pack Startup",
      category: "Paquetes",
      tagline: "Perfecto para emprendedores",
      description: "El paquete ideal para startups y nuevos emprendimientos.",
      image: "",
      price: { regular: 3500, promotional: 2499, currency: "EUR" },
      discount: 29,
      featured: true,
      promoted: true,
      includes: [
        "Sitio web responsive (hasta 5 páginas)",
        "Diseño personalizado",
        "Optimización SEO básica",
        "Formulario de contacto",
        "Integración con redes sociales",
        "SSL y hosting por 1 año",
        "Google Analytics configurado",
        "3 meses de soporte técnico"
      ],
      deliveryTime: "2-3 semanas",
      badge: "¡OFERTA!"
    },
    {
      id: "pack-business",
      name: "Pack Business",
      category: "Paquetes",
      tagline: "Para empresas en crecimiento",
      description: "Solución completa para empresas que buscan expandir su presencia digital.",
      image: "",
      price: { regular: 6500, promotional: 4999, currency: "EUR" },
      discount: 23,
      featured: true,
      promoted: true,
      includes: [
        "Todo lo del Pack Startup",
        "Hasta 15 páginas",
        "Blog con gestor de contenidos",
        "Optimización SEO avanzada",
        "Chat en vivo",
        "Newsletter/Email marketing",
        "Panel de administración",
        "Integración con CRM",
        "6 meses de soporte técnico",
        "Capacitación del equipo"
      ],
      deliveryTime: "4-6 semanas",
      badge: "MÁS POPULAR"
    },
    {
      id: "ecommerce-completo",
      name: "E-commerce Completo",
      category: "Tiendas Online",
      tagline: "Vende 24/7",
      description: "Tienda online profesional completamente equipada.",
      image: "",
      price: { regular: 4500, promotional: 3499, currency: "EUR" },
      discount: 22,
      featured: true,
      promoted: true,
      includes: [
        "Tienda online responsive",
        "Hasta 100 productos",
        "Pasarela de pago integrada",
        "Gestión de inventario",
        "Carrito de compra",
        "Cupones de descuento",
        "Sistema de envíos",
        "Emails transaccionales",
        "Panel de administración",
        "6 meses de soporte"
      ],
      deliveryTime: "4-5 semanas",
      badge: "OFERTA LIMITADA"
    }
  ];

  // Promociones hardcoded
  private readonly promotionsData: Promotions = {
    active: true,
    endDate: "2026-03-31",
    message: "¡Promoción especial! Hasta 30% de descuento en paquetes seleccionados",
    code: "PROMO2026"
  };

  // Signals para reactivity
  companyInfo = signal<CompanyInfo | null>(this.companyData);
  services = signal<Service[]>(this.servicesData);
  products = signal<Product[]>(this.productsData);
  promotions = signal<Promotions | null>(this.promotionsData);

  constructor() {
    // Datos ya inicializados en los signals
  }

  getFeaturedServices(): Service[] {
    return this.services().filter(service => service.featured);
  }

  getFeaturedProducts(): Product[] {
    return this.products().filter(product => product.featured);
  }

  getPromotedProducts(): Product[] {
    return this.products().filter(product => product.promoted);
  }

  getServiceById(id: string): Service | undefined {
    return this.services().find(service => service.id === id);
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(product => product.id === id);
  }
}
