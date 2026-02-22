import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { 
  CompanyInfo, 
  Service, 
  Product, 
  Promotions, 
  APIConfig 
} from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private readonly assetsPath = '/assets/data';
  
  // Signals para reactivity
  companyInfo = signal<CompanyInfo | null>(null);
  services = signal<Service[]>([]);
  products = signal<Product[]>([]);
  promotions = signal<Promotions | null>(null);
  apiConfig = signal<APIConfig | null>(null);

  constructor(private http: HttpClient) {
    this.loadAllData();
  }

  private loadAllData(): void {
    this.loadCompanyInfo().subscribe();
    this.loadServices().subscribe();
    this.loadProducts().subscribe();
    this.loadAPIConfig().subscribe();
  }

  loadCompanyInfo(): Observable<CompanyInfo> {
    return this.http.get<CompanyInfo>(`${this.assetsPath}/company-info.json`)
      .pipe(
        tap(data => this.companyInfo.set(data))
      );
  }

  loadServices(): Observable<{ services: Service[] }> {
    return this.http.get<{ services: Service[] }>(`${this.assetsPath}/services.json`)
      .pipe(
        tap(data => this.services.set(data.services))
      );
  }

  loadProducts(): Observable<{ products: Product[]; promotions: Promotions }> {
    return this.http.get<{ products: Product[]; promotions: Promotions }>(`${this.assetsPath}/products.json`)
      .pipe(
        tap(data => {
          this.products.set(data.products);
          this.promotions.set(data.promotions);
        })
      );
  }

  loadAPIConfig(): Observable<APIConfig> {
    return this.http.get<APIConfig>(`${this.assetsPath}/api-config.json`)
      .pipe(
        tap(data => this.apiConfig.set(data))
      );
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
