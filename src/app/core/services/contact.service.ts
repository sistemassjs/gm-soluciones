import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactFormData } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  sendContactForm(formData: ContactFormData, endpoint: string): Observable<any> {
    return this.http.post(endpoint, formData);
  }

  openWhatsApp(phone: string, message?: string): void {
    // Remove all non-digit characters from phone
    const cleanPhone = phone.replace(/\D/g, '');
    
    // Encode message if provided
    const encodedMessage = message ? encodeURIComponent(message) : '';
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${cleanPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`;
    
    // Open in new window
    window.open(whatsappUrl, '_blank');
  }

  getDefaultWhatsAppMessage(serviceName?: string): string {
    const baseMessage = '¡Hola! Me gustaría obtener más información sobre sus servicios.';
    return serviceName 
      ? `${baseMessage} Estoy interesado en: ${serviceName}.`
      : baseMessage;
  }

  makePhoneCall(phone: string): void {
    window.location.href = `tel:${phone}`;
  }

  sendEmail(email: string, subject?: string, body?: string): void {
    let mailtoUrl = `mailto:${email}`;
    const params: string[] = [];
    
    if (subject) {
      params.push(`subject=${encodeURIComponent(subject)}`);
    }
    
    if (body) {
      params.push(`body=${encodeURIComponent(body)}`);
    }
    
    if (params.length > 0) {
      mailtoUrl += `?${params.join('&')}`;
    }
    
    window.location.href = mailtoUrl;
  }
}
