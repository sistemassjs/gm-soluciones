import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../core/services/data.service';
import { ContactService } from '../core/services/contact.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
      [class.shadow-lg]="!isScrolled()"
      [class.shadow-2xl]="isScrolled()"
      [class.py-3]="!isScrolled()"
      [class.py-2]="isScrolled()">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            @if(companyInfo()) {
              <a href="#inicio" class="flex items-center space-x-2 md:space-x-3 group">
                <img 
                  [src]="companyInfo()!.logoSmall || companyInfo()!.logo" 
                  alt="{{ companyInfo()!.name }} Logo"
                  class="transition-all duration-300 w-8 h-8 md:w-10 md:h-10 rounded-lg"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div 
                  class="bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-all duration-300 w-8 h-8 md:w-10 md:h-10"
                  style="display: none;">
                  <span class="text-white font-bold text-base md:text-lg">GM</span>
                </div>
                <span 
                  class="font-heading font-bold text-white transition-all duration-300 text-lg md:text-xl lg:text-2xl">
                  {{ companyInfo()!.name }}
                </span>
              </a>
            }
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#inicio" (click)="scrollToSection($event, 'inicio')" class="nav-link text-sm lg:text-base">Inicio</a>
            <a href="#servicios" (click)="scrollToSection($event, 'servicios')" class="nav-link text-sm lg:text-base">Servicios</a>
            <a href="#productos" (click)="scrollToSection($event, 'productos')" class="nav-link text-sm lg:text-base">Productos</a>
            <a href="#contacto" (click)="scrollToSection($event, 'contacto')" class="nav-link text-sm lg:text-base">Contacto</a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg hover:bg-gray-700 transition-colors text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              @if(!mobileMenuOpen()) {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              } @else {
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              }
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        @if(mobileMenuOpen()) {
          <div class="md:hidden mt-4 pb-4 border-t border-gray-700 pt-4 animate-fade-in-up">
            <div class="flex flex-col space-y-3">
              <a href="#inicio" (click)="scrollToSection($event, 'inicio'); closeMobileMenu()" class="nav-link-mobile">Inicio</a>
              <a href="#servicios" (click)="scrollToSection($event, 'servicios'); closeMobileMenu()" class="nav-link-mobile">Servicios</a>
              <a href="#productos" (click)="scrollToSection($event, 'productos'); closeMobileMenu()" class="nav-link-mobile">Productos</a>
              <a href="#contacto" (click)="scrollToSection($event, 'contacto'); closeMobileMenu()" class="nav-link-mobile">Contacto</a>
              
              @if(companyInfo()) {
                <button 
                  (click)="openWhatsApp()"
                  class="btn-primary w-full flex items-center justify-center space-x-2 mt-2">
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>
              }
            </div>
          </div>
        }
      </nav>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  private dataService = inject(DataService);
  private contactService = inject(ContactService);

  companyInfo = this.dataService.companyInfo;
  mobileMenuOpen = signal(false);
  isScrolled = signal(false);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    this.isScrolled.set(currentScrollY > 20);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  scrollToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Altura del header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }

  openWhatsApp(): void {
    const info = this.companyInfo();
    if (info) {
      const message = this.contactService.getDefaultWhatsAppMessage();
      this.contactService.openWhatsApp(info.contact.whatsapp, message);
    }
    this.closeMobileMenu();
  }
}
