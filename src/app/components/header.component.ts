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
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-2xl"
      [class.py-4]="!isScrolled()"
      [class.py-2]="isScrolled()"
      [style.transform]="scrollDirection() === 'down' && isScrolled() ? 'translateY(-100%)' : 'translateY(0)'"
      [style.box-shadow]="'0 10px 30px rgba(0, 0, 0, 0.5)'">
      <nav class="max-w-6xl mx-auto px-6 lg:px-8 transition-all duration-500">
        <div class="flex items-center justify-between" [class.py-2]="isScrolled()" [class.py-4]="!isScrolled()">
          <!-- Logo -->
          <div class="flex items-center space-x-3">
            @if(companyInfo()) {
              <a href="#inicio" class="flex items-center space-x-3 group">
                <img 
                  [src]="companyInfo()!.logo" 
                  alt="{{ companyInfo()!.name }} Logo"
                  class="transition-all duration-300"
                  [class.w-12]="!isScrolled()"
                  [class.h-12]="!isScrolled()"
                  [class.w-10]="isScrolled()"
                  [class.h-10]="isScrolled()"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                <div 
                  class="bg-primary-600 rounded-lg flex items-center justify-center group-hover:bg-primary-700 transition-all duration-300"
                  [class.w-12]="!isScrolled()"
                  [class.h-12]="!isScrolled()"
                  [class.w-10]="isScrolled()"
                  [class.h-10]="isScrolled()"
                  style="display: none;">
                  <span class="text-white font-bold" [class.text-xl]="!isScrolled()" [class.text-lg]="isScrolled()">GM</span>
                </div>
                <span 
                  class="font-heading font-bold text-white transition-all duration-300"
                  [class.text-2xl]="!isScrolled()"
                  [class.text-xl]="isScrolled()">
                  {{ companyInfo()!.name }}
                </span>
              </a>
            }
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="#inicio" class="nav-link">Inicio</a>
            <a href="#servicios" class="nav-link">Servicios</a>
            <a href="#productos" class="nav-link">Productos</a>
            <a href="#contacto" class="nav-link">Contacto</a>
          </div>

          <!-- Mobile Menu Button -->
          <button 
            (click)="toggleMobileMenu()"
            class="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors">
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
          <div class="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-fade-in-up">
            <div class="flex flex-col space-y-4">
              <a href="#inicio" (click)="closeMobileMenu()" class="nav-link-mobile">Inicio</a>
              <a href="#servicios" (click)="closeMobileMenu()" class="nav-link-mobile">Servicios</a>
              <a href="#productos" (click)="closeMobileMenu()" class="nav-link-mobile">Productos</a>
              <a href="#contacto" (click)="closeMobileMenu()" class="nav-link-mobile">Contacto</a>
              
              @if(companyInfo()) {
                <button 
                  (click)="openWhatsApp()"
                  class="btn-primary w-full flex items-center justify-center space-x-2">
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
  scrollDirection = signal<'up' | 'down'>('up');
  private lastScrollY = 0;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 50) {
      this.isScrolled.set(true);
      
      if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        this.scrollDirection.set('down');
      } else {
        this.scrollDirection.set('up');
      }
    } else {
      this.isScrolled.set(false);
      this.scrollDirection.set('up');
    }
    
    this.lastScrollY = currentScrollY;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
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
