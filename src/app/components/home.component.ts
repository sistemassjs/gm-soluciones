import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../core/services/data.service';
import { ContactService } from '../core/services/contact.service';
import { SeoService } from '../core/services/seo.service';
import { HeaderComponent } from './header.component';
import { FooterComponent } from './footer.component';
import { HeroComponent } from './hero.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, HeaderComponent, FooterComponent, HeroComponent],
  template: `
    <app-header />
    
    <main>
      <app-hero />
      
      <!-- Services Section -->
      <section id="servicios" class="relative py-12 md:py-20 overflow-hidden">
        <!-- Fondo difuminado azul -->
        <div class="absolute inset-0 bg-gradient-to-br from-primary-50/30 via-transparent to-primary-100/20 pointer-events-none"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <!-- Header Especial -->
          <div class="text-center mb-8 md:mb-12 animate-fade-in-up">
            <div class="inline-block bg-gradient-to-r from-primary-600 to-secondary-600 text-white px-8 py-4 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-all duration-300">
              <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">🚀 Nuestros Servicios</h2>
              <p class="text-base md:text-lg opacity-90">Innovación que impulsa tu negocio</p>
            </div>
          </div>
          
          @if(services().length > 0) {
            <!-- Carrusel Container -->
            <div class="relative max-w-4xl mx-auto">
              <!-- Carrusel -->
              <div class="overflow-hidden rounded-2xl">
                @for(service of services(); track service.id; let i = $index) {
                  <div 
                    class="transition-all duration-700 ease-in-out"
                    [class.block]="currentServiceIndex() === i"
                    [class.hidden]="currentServiceIndex() !== i">
                    <div class="card bg-white p-6 md:p-8 overflow-hidden">
                      <!-- Imagen ilustrativa -->
                      <div class="relative h-48 md:h-56 -mx-6 -mt-6 md:-mx-8 md:-mt-8 mb-6 bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center overflow-hidden">
                        <div class="absolute inset-0 opacity-10">
                          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')"></div>
                        </div>
                        <div class="relative text-7xl md:text-8xl animate-bounce-slow drop-shadow-2xl">{{ service.icon }}</div>
                      </div>
                      
                      <!-- Header del servicio -->
                      <div class="text-center mb-6">
                        <h3 class="text-2xl md:text-3xl font-heading font-bold text-gray-900 mb-2">{{ service.title }}</h3>
                        <p class="text-sm md:text-base text-gray-600">{{ service.shortDescription }}</p>
                      </div>
                      
                      <!-- Características con animación uno por uno -->
                      <div class="space-y-3">
                        @for(feature of service.features.slice(0, 4); track feature; let idx = $index) {
                          <div 
                            class="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 opacity-0 animate-fade-in-up transform translate-y-4"
                            [style.animation-delay]="(idx * 200) + 'ms'"
                            [style.animation-fill-mode]="'forwards'">
                            <div class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center flex-shrink-0">
                              <svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                              </svg>
                            </div>
                            <span class="text-sm md:text-base text-gray-700 font-medium">{{ feature }}</span>
                          </div>
                        }
                      </div>
                      
                      <!-- Botón de acción -->
                      <button (click)="contactForService(service.title)" class="btn-primary w-full md:w-auto md:px-8">
                        Solicitar Información
                      </button>
                    </div>
                  </div>
                }
              </div>
              
              <!-- Controles del carrusel -->
              <div class="flex items-center justify-center mt-6 gap-4">
                <!-- Botón anterior -->
                <button 
                  (click)="previousService()"
                  class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-primary-600 hover:text-white group">
                  <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                  </svg>
                </button>
                
                <!-- Indicadores -->
                <div class="flex gap-2">
                  @for(service of services(); track service.id; let i = $index) {
                    <button
                      (click)="goToService(i)"
                      class="transition-all duration-300 rounded-full"
                      [class.w-8]="currentServiceIndex() === i"
                      [class.w-3]="currentServiceIndex() !== i"
                      [class.h-3]="true"
                      [class.bg-primary-600]="currentServiceIndex() === i"
                      [class.bg-gray-300]="currentServiceIndex() !== i">
                    </button>
                  }
                </div>
                
                <!-- Botón siguiente -->
                <button 
                  (click)="nextService()"
                  class="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-primary-600 hover:text-white group">
                  <svg class="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          }
        </div>
      </section>

      <!-- Banner Tecnológico -->
      <section class="relative py-16 md:py-24 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-secondary-900"></div>
        <div class="absolute inset-0 opacity-10">
          <div class="absolute inset-0" style="background-image: url('data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="0.1" fill-rule="evenodd"/%3E%3C/svg%3E')"></div>
        </div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div class="animate-fade-in-up">
            <div class="inline-block mb-6">
              <span class="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                ✨ Impulsa tu negocio con tecnología de vanguardia
              </span>
            </div>
            
            <h2 class="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Transforma tus ideas en<br class="hidden md:block">
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-secondary-300">soluciones digitales</span>
            </h2>
            
            <p class="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Contrata nuestros servicios y lleva tu empresa al siguiente nivel con tecnología innovadora y soluciones personalizadas
            </p>
            
            <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contacto" class="btn-primary bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg shadow-2xl">
                🚀 Iniciar Proyecto
              </a>
              <a href="#servicios" class="btn-outline border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg">
                Ver Servicios
              </a>
            </div>
            
            <!-- Stats -->
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto">
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">200+</div>
                <div class="text-sm text-gray-300">Proyectos</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">150+</div>
                <div class="text-sm text-gray-300">Clientes</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">98%</div>
                <div class="text-sm text-gray-300">Satisfacción</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                <div class="text-3xl md:text-4xl font-bold text-white mb-2">24/7</div>
                <div class="text-sm text-gray-300">Soporte</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Products Section (Oculta) -->
      <section id="productos" class="hidden relative py-12 md:py-20 overflow-hidden bg-gray-50">
        <!-- Fondo difuminado azul -->
        <div class="absolute inset-0 bg-gradient-to-tr from-primary-50/20 via-transparent to-secondary-50/20 pointer-events-none"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8 md:mb-12 animate-fade-in-up">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">Paquetes y Productos</h2>
          <p class="text-base md:text-xl text-gray-600 mb-4">Soluciones completas para tu negocio</p>
          @if(promotions() && promotions()!.active) {
            <div class="inline-block bg-primary-100 text-primary-700 px-4 md:px-6 py-2 md:py-3 rounded-lg">
              <p class="font-semibold text-sm md:text-base">{{ promotions()!.message }}</p>
            </div>
          }
        </div>
        
        @if(products().length > 0) {
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            @for(product of products(); track product.id) {
              <div class="card hover:scale-102 md:hover:scale-105 transition-all duration-300 relative flex flex-col h-full">
                @if(product.badge) {
                  <div class="absolute top-3 right-3 md:top-4 md:right-4 bg-primary-600 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-bold">
                    {{ product.badge }}
                  </div>
                }
                <h3 class="text-xl md:text-2xl font-heading font-bold mb-2 pr-16">{{ product.name }}</h3>
                <p class="text-xs md:text-sm text-gray-500 mb-2">{{ product.tagline }}</p>
                <p class="text-sm md:text-base text-gray-600 mb-4 line-clamp-3">{{ product.description }}</p>
                
                <div class="mb-4">
                  @if(product.discount > 0) {
                    <div class="flex flex-wrap items-baseline gap-2">
                      <span class="text-2xl md:text-3xl font-bold text-primary-600">{{ product.price.promotional }}€</span>
                      <span class="text-base md:text-lg text-gray-400 line-through">{{ product.price.regular }}€</span>
                      <span class="bg-red-100 text-red-700 px-2 py-1 rounded text-xs md:text-sm font-bold">
                        -{{ product.discount }}%
                      </span>
                    </div>
                  } @else {
                    <span class="text-2xl md:text-3xl font-bold text-primary-600">{{ product.price.regular }}€</span>
                  }
                </div>
                
                <ul class="space-y-2 mb-6 flex-grow">
                  @for(item of product.includes.slice(0, 5); track item) {
                    <li class="flex items-start space-x-2 text-xs md:text-sm text-gray-600">
                      <span class="text-primary-600 flex-shrink-0">✓</span>
                      <span>{{ item }}</span>
                    </li>
                  }
                </ul>
                
                <button (click)="contactForProduct(product.name)" class="btn-primary w-full text-sm md:text-base mt-auto">
                  Solicitar Información
                </button>
              </div>
            }
          </div>
        }
        </div>
      </section>

      <!-- Contact Section -->
      <section id="contacto" class="relative py-12 md:py-20 overflow-hidden">
        <!-- Fondo difuminado azul -->
        <div class="absolute inset-0 bg-gradient-to-bl from-primary-50/30 via-transparent to-secondary-50/10 pointer-events-none"></div>
        
        <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-8 md:mb-12 animate-fade-in-up">
            <h2 class="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-900 mb-3">Contáctanos</h2>
            <p class="text-base md:text-xl text-gray-600">Estamos listos para ayudarte con tu proyecto</p>
          </div>
          
          <!-- Unified Contact Card -->
          <div class="card max-w-5xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              <!-- Contact Form - 2/3 -->
              <div class="lg:col-span-2">
                <h3 class="text-xl md:text-2xl font-heading font-bold mb-4 md:mb-6">Envíanos un mensaje</h3>
                @if(formSubmitted()) {
                  @if(formSuccess()) {
                    <div class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-4">
                      ¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.
                    </div>
                  } @else {
                    <div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
                      Hubo un error al enviar el formulario. Por favor, intenta de nuevo o contáctanos por WhatsApp.
                    </div>
                  }
                }
                
                <form [formGroup]="contactForm" (ngSubmit)="submitForm()">
                  <div class="space-y-3 md:space-y-4">
                    <div>
                      <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
                      <input type="text" formControlName="name" placeholder="Juan Pérez"
                        class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Email *</label>
                      <input type="email" formControlName="email" placeholder="correo@ejemplo.com"
                        class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Contacto *</label>
                      <input type="tel" formControlName="phone" placeholder="+34 123 456 789"
                        class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    </div>
                    
                    <div>
                      <label class="block text-xs md:text-sm font-medium text-gray-700 mb-1">Servicio de interés *</label>
                      <select formControlName="service" 
                        class="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                        <option value="">Selecciona un servicio</option>
                        <option value="Desarrollo Web">Desarrollo Web</option>
                        <option value="Desarrollo Móvil">Desarrollo Móvil</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Consultoría IT">Consultoría IT</option>
                        <option value="Software a Medida">Software a Medida</option>
                        <option value="Inteligencia Artificial">Inteligencia Artificial</option>
                      </select>
                    </div>
                    
                    <button type="submit" [disabled]="!contactForm.valid || submitting()" 
                      class="btn-primary w-full text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed">
                      {{ submitting() ? 'Enviando...' : 'Enviar Mensaje' }}
                    </button>
                  </div>
                </form>
              </div>
              
              <!-- Contact Info - 1/3 -->
              @if(companyInfo()) {
                <div class="lg:border-l lg:pl-8 space-y-6">
                  <div>
                    <h3 class="text-xl font-heading font-bold mb-6">Información de Contacto</h3>
                    <div class="space-y-4">
                      <div class="flex items-start space-x-3">
                        <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        <div>
                          <p class="font-medium text-sm text-gray-500">Dirección</p>
                          <p class="text-gray-900">{{ companyInfo()!.contact.address }}</p>
                        </div>
                      </div>
                      
                      <div class="flex items-start space-x-3">
                        <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                        <div>
                          <p class="font-medium text-sm text-gray-500">Teléfono</p>
                          <a [href]="'tel:' + companyInfo()!.contact.phone" class="text-primary-600 hover:text-primary-700 font-medium">
                            {{ companyInfo()!.contact.phone }}
                          </a>
                        </div>
                      </div>
                      
                      <div class="flex items-start space-x-3">
                        <svg class="w-6 h-6 text-primary-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                        <div>
                          <p class="font-medium text-sm text-gray-500">Email</p>
                          <a [href]="'mailto:' + companyInfo()!.contact.email" class="text-primary-600 hover:text-primary-700 font-medium break-all">
                            {{ companyInfo()!.contact.email }}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div class="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-xl">
                    <div class="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full mb-4">
                      <svg class="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                    </div>
                    <h4 class="text-lg font-heading font-bold mb-2">¿Prefieres WhatsApp?</h4>
                    <p class="text-white/90 text-sm mb-4">Chatea con nosotros directamente</p>
                    <button (click)="openWhatsApp()" class="bg-white text-green-600 px-4 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors w-full text-sm">
                      Abrir WhatsApp
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </main>
    
    <app-footer />
    
    <!-- Floating WhatsApp Button -->
    @if(companyInfo()) {
      <button 
        (click)="openWhatsApp()"
        class="fixed bottom-4 right-4 md:bottom-6 md:right-6 w-14 h-14 md:w-16 md:h-16 bg-green-500 hover:bg-green-600 active:scale-95 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-40 animate-bounce-slow"
        aria-label="Contactar por WhatsApp">
        <svg class="w-7 h-7 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
      </button>
    }
  `,
  styles: []
})
export class HomeComponent {
  private dataService = inject(DataService);
  private contactService = inject(ContactService);
  private seoService = inject(SeoService);
  private fb = inject(FormBuilder);
  
  companyInfo = this.dataService.companyInfo;
  services = this.dataService.services;
  products = this.dataService.products;
  promotions = this.dataService.promotions;
  
  submitting = signal(false);
  formSubmitted = signal(false);
  formSuccess = signal(false);
  
  // Carrusel de servicios
  currentServiceIndex = signal(0);
  private carouselInterval: any;
  
  contactForm: FormGroup;

  constructor() {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      company: [''],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
    
    // Initialize SEO
    this.initializeSEO();
    
    // Iniciar carrusel automático
    this.startCarousel();
  }
  
  ngOnDestroy() {
    this.stopCarousel();
  }

  private initializeSEO(): void {
    const info = this.companyInfo();
    if (info) {
      this.seoService.updateMetaTags({
        title: info.seo.metaDescription,
        description: info.seo.metaDescription,
        keywords: info.seo.keywords.join(', '),
        image: info.seo.ogImage,
        url: window.location.href,
        type: 'website'
      });
      
      const orgSchema = this.seoService.createOrganizationSchema(info);
      this.seoService.addStructuredData(orgSchema);
    }
  }

  submitForm(): void {
    if (this.contactForm.valid && !this.submitting()) {
      this.submitting.set(true);
      this.formSubmitted.set(false);
      
      const formData = this.contactForm.value;
      const endpoint = 'https://api.solucionesgm.com/contact'; // Update with real endpoint
      
      this.contactService.sendContactForm(formData, endpoint).subscribe({
        next: () => {
          this.formSuccess.set(true);
          this.formSubmitted.set(true);
          this.submitting.set(false);
          this.contactForm.reset();
        },
        error: () => {
          this.formSuccess.set(false);
          this.formSubmitted.set(true);
          this.submitting.set(false);
        }
      });
    }
  }

  openWhatsApp(): void {
    const info = this.companyInfo();
    if (info) {
      const message = this.contactService.getDefaultWhatsAppMessage();
      this.contactService.openWhatsApp(info.contact.whatsapp, message);
    }
  }

  contactForService(serviceName: string): void {
    const info = this.companyInfo();
    if (info) {
      const message = this.contactService.getDefaultWhatsAppMessage(serviceName);
      this.contactService.openWhatsApp(info.contact.whatsapp, message);
    }
  }

  contactForProduct(productName: string): void {
    const info = this.companyInfo();
    if (info) {
      const message = `¡Hola! Me gustaría obtener más información sobre ${productName}.`;
      this.contactService.openWhatsApp(info.contact.whatsapp, message);
    }
  }
  
  // Métodos del carrusel
  startCarousel(): void {
    this.carouselInterval = setInterval(() => {
      this.nextService();
    }, 5000); // Cambiar cada 5 segundos
  }
  
  stopCarousel(): void {
    if (this.carouselInterval) {
      clearInterval(this.carouselInterval);
    }
  }
  
  nextService(): void {
    const servicesLength = this.services().length;
    if (servicesLength > 0) {
      this.currentServiceIndex.set((this.currentServiceIndex() + 1) % servicesLength);
    }
  }
  
  previousService(): void {
    const servicesLength = this.services().length;
    if (servicesLength > 0) {
      const newIndex = this.currentServiceIndex() - 1;
      this.currentServiceIndex.set(newIndex < 0 ? servicesLength - 1 : newIndex);
    }
  }
  
  goToService(index: number): void {
    this.currentServiceIndex.set(index);
    // Reiniciar el temporizador cuando el usuario interactúa manualmente
    this.stopCarousel();
    this.startCarousel();
  }
}
