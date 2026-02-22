import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../core/services/data.service';
import { ContactService } from '../core/services/contact.service';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="absolute inset-0 bg-gradient-to-bl from-primary-50/30 via-transparent to-secondary-50/10 pointer-events-none"></div>
    <section id="inicio" class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">

      <div class="max-w-6xl mx-auto px-6 lg:px-8">
        @if(companyInfo()) {
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <!-- Content -->
            <div class="animate-fade-in-up">
              <h1 class="text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-gray-900 mb-6 leading-tight">
                {{ companyInfo()!.tagline }}
              </h1>
              <p class="text-xl text-gray-600 mb-8 leading-relaxed">
                {{ companyInfo()!.description }}
              </p>
              <div class="flex flex-col sm:flex-row gap-4">
                <a href="#servicios" class="btn-primary text-center">
                  Ver Servicios
                </a>
                <button (click)="openWhatsApp()" class="btn-outline flex items-center justify-center space-x-2">
                  <span>💬</span>
                  <span>Contáctanos</span>
                </button>
              </div>
              
              <!-- Stats -->
              <div class="grid grid-cols-3 gap-6 mt-12">
                <div class="text-center">
                  <div class="text-3xl font-heading font-bold text-primary-600 mb-1">200+</div>
                  <div class="text-sm text-gray-600">Proyectos</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-heading font-bold text-primary-600 mb-1">150+</div>
                  <div class="text-sm text-gray-600">Clientes</div>
                </div>
                <div class="text-center">
                  <div class="text-3xl font-heading font-bold text-primary-600 mb-1">98%</div>
                  <div class="text-sm text-gray-600">Satisfacción</div>
                </div>
              </div>
            </div>

            <!-- Illustration -->
            <div class="hidden lg:block animate-slide-in-right">
              <div class="relative">
                <div class="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-2xl transform rotate-6 opacity-20"></div>
                <div class="relative bg-white p-8 rounded-2xl shadow-2xl">
                  <div class="space-y-4">
                    <div class="h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg"></div>
                    <div class="h-8 bg-gray-200 rounded-lg w-3/4"></div>
                    <div class="h-8 bg-gray-200 rounded-lg w-5/6"></div>
                    <div class="grid grid-cols-2 gap-4 mt-6">
                      <div class="h-32 bg-gradient-to-br from-primary-100 to-primary-200 rounded-lg"></div>
                      <div class="h-32 bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: []
})
export class HeroComponent {
  private dataService = inject(DataService);
  private contactService = inject(ContactService);

  companyInfo = this.dataService.companyInfo;

  openWhatsApp(): void {
    const info = this.companyInfo();
    if (info) {
      const message = this.contactService.getDefaultWhatsAppMessage();
      this.contactService.openWhatsApp(info.contact.whatsapp, message);
    }
  }
}
