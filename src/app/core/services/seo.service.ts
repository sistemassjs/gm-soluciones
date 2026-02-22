import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

export interface SEOData {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private meta = inject(Meta);
  private titleService = inject(Title);
  private document = inject(DOCUMENT);

  private readonly defaultTitle = 'SolucionesGM - Desarrollo de Software y Soluciones Tecnológicas';
  private readonly defaultDescription = 'Empresa líder en desarrollo de software y soluciones tecnológicas. Desarrollo web, apps móviles, consultoría IT y transformación digital.';
  private readonly defaultKeywords = 'desarrollo de software, aplicaciones web, aplicaciones móviles, consultoría IT, transformación digital';
  private readonly defaultImage = '/assets/images/og-image.jpg';
  private readonly siteName = 'SolucionesGM';
  
  updateMetaTags(seoData: SEOData): void {
    // Title
    const title = seoData.title || this.defaultTitle;
    this.titleService.setTitle(title);

    // Description
    const description = seoData.description || this.defaultDescription;
    this.meta.updateTag({ name: 'description', content: description });

    // Keywords
    const keywords = seoData.keywords || this.defaultKeywords;
    this.meta.updateTag({ name: 'keywords', content: keywords });

    // Author
    if (seoData.author) {
      this.meta.updateTag({ name: 'author', content: seoData.author });
    }

    // Open Graph Tags
    this.updateOpenGraphTags(title, description, seoData);

    // Twitter Card Tags
    this.updateTwitterCardTags(title, description, seoData);

    // Update canonical URL
    if (seoData.url) {
      this.updateCanonicalUrl(seoData.url);
    }
  }

  private updateOpenGraphTags(title: string, description: string, seoData: SEOData): void {
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:type', content: seoData.type || 'website' });
    this.meta.updateTag({ property: 'og:image', content: seoData.image || this.defaultImage });
    this.meta.updateTag({ property: 'og:site_name', content: this.siteName });
    
    if (seoData.url) {
      this.meta.updateTag({ property: 'og:url', content: seoData.url });
    }

    if (seoData.publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: seoData.publishedTime });
    }

    if (seoData.modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: seoData.modifiedTime });
    }
  }

  private updateTwitterCardTags(title: string, description: string, seoData: SEOData): void {
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });
    this.meta.updateTag({ name: 'twitter:image', content: seoData.image || this.defaultImage });
    
    if (seoData.author) {
      this.meta.updateTag({ name: 'twitter:creator', content: `@${seoData.author}` });
    }
  }

  private updateCanonicalUrl(url: string): void {
    // Remove existing canonical link if present
    const existingCanonical = this.document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.remove();
    }

    // Add new canonical link
    const link: HTMLLinkElement = this.document.createElement('link');
    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', url);
    this.document.head.appendChild(link);
  }

  addStructuredData(data: any): void {
    // Remove existing structured data
    const existingScript = this.document.querySelector('script[type="application/ld+json"]');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  createOrganizationSchema(companyInfo: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: companyInfo.name,
      url: window.location.origin,
      logo: window.location.origin + companyInfo.logo,
      description: companyInfo.description,
      email: companyInfo.contact.email,
      telephone: companyInfo.contact.phone,
      address: {
        '@type': 'PostalAddress',
        streetAddress: companyInfo.contact.address
      },
      sameAs: Object.values(companyInfo.social)
    };
  }

  createWebSiteSchema(): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: this.siteName,
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    };
  }

  createServiceSchema(service: any): any {
    return {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: service.title,
      description: service.description,
      provider: {
        '@type': 'Organization',
        name: this.siteName
      },
      offers: {
        '@type': 'Offer',
        price: service.pricing.from,
        priceCurrency: service.pricing.currency
      }
    };
  }
}
