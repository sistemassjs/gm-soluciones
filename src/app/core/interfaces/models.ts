export interface CompanyInfo {
  name: string;
  fullName: string;
  tagline: string;
  description: string;
  mission: string;
  vision: string;
  founded: string;
  logo: string;
  logoSmall?: string;
  logoMedium?: string;
  logoLarge?: string;
  logoXLarge?: string;
  contact: ContactInfo;
  social: SocialMedia;
  seo: SEOConfig;
}

export interface ContactInfo {
  email: string;
  phone: string;
  whatsapp: string;
  address: string;
}

export interface SocialMedia {
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  github: string;
}

export interface SEOConfig {
  keywords: string[];
  metaDescription: string;
  ogImage: string;
}

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  features: string[];
  technologies: string[];
  pricing: Pricing;
  featured: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  image: string;
  price: ProductPrice;
  discount: number;
  featured: boolean;
  promoted: boolean;
  includes: string[];
  deliveryTime: string;
  badge: string | null;
}

export interface ProductPrice {
  regular: number;
  promotional: number;
  currency: string;
  recurrence?: string;
}

export interface Pricing {
  from: number;
  currency: string;
  unit: string;
}

export interface Promotions {
  active: boolean;
  endDate: string;
  message: string;
  code: string;
}

export interface ContactFormField {
  name: string;
  type: 'text' | 'email' | 'tel' | 'select' | 'textarea';
  label: string;
  placeholder: string;
  required: boolean;
  minLength?: number;
  maxLength?: number;
  rows?: number;
  options?: string[];
}

export interface ContactFormConfig {
  endpoint: string;
  method: string;
  headers: Record<string, string>;
  fields: ContactFormField[];
  successMessage: string;
  errorMessage: string;
}

export interface APIConfig {
  contactForm: ContactFormConfig;
  newsletter: {
    endpoint: string;
    method: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service: string;
  message: string;
}
