# 🚀 SolucionesGM - Sitio Web Corporativo

## 📋 Descripción del Proyecto

Sitio web corporativo moderno para **SolucionesGM**, empresa líder en desarrollo de software y soluciones tecnológicas. Desarrollado con Angular 20, Tailwind CSS, y optimizado para SEO.

## 🛠️ Stack Tecnológico

- **Framework**: Angular 20 con Standalone Components
- **Estilos**: Tailwind CSS 4.0 + SASS
- **Animaciones**: animate.css
- **Formularios**: Reactive Forms
- **HTTP**: HttpClient con fetch API
- **SEO**: Meta tags dinámicos, Schema.org, Open Graph
- **Arquitectura**: Single Page Application (SPA)

## 📁 Estructura del Proyecto

```
gm-soluciones/
├── public/
│   ├── assets/
│   │   └── data/
│   │       ├── company-info.json    # Información de la empresa
│   │       ├── services.json        # Servicios ofrecidos
│   │       ├── products.json        # Productos/Paquetes
│   │       └── api-config.json      # Configuración de APIs
│   ├── sitemap.xml                  # Sitemap para SEO
│   └── robots.txt                   # Control de rastreo
├── src/
│   ├── app/
│   │   ├── components/              # Componentes de UI
│   │   │   ├── header.component.ts
│   │   │   ├── footer.component.ts
│   │   │   ├── hero.component.ts
│   │   │   └── home.component.ts    # Página principal
│   │   ├── core/
│   │   │   ├── interfaces/
│   │   │   │   └── models.ts        # Interfaces TypeScript
│   │   │   └── services/
│   │   │       ├── data.service.ts  # Gestión de datos JSON
│   │   │       ├── contact.service.ts
│   │   │       └── seo.service.ts   # Gestión de SEO
│   │   ├── app.ts                   # Componente raíz
│   │   ├── app.config.ts            # Configuración de la app
│   │   └── app.routes.ts            # Rutas (si las hay)
│   ├── index.html                   # HTML principal con meta tags
│   ├── styles.sass                  # Estilos globales
│   └── main.ts                      # Bootstrap de la aplicación
├── tailwind.config.js               # Configuración de Tailwind
├── angular.json                     # Configuración de Angular
├── package.json                     # Dependencias
├── SEO-GUIDE.md                     # 📚 Guía completa de SEO
└── PROJECT-README.md                # Este archivo

```

## 🎯 Características Principales

### ✨ Funcionalidades

- ✅ **Single Page Application**: Navegación fluida con anchors (#servicios, #productos, etc.)
- ✅ **Header Responsive**: Logo, menú de navegación, botón WhatsApp, menú móvil hamburguesa
- ✅ **Hero Section**: Presentación impactante con estadísticas y CTAs
- ✅ **Sección de Servicios**: 6 servicios con descripción, características, tecnologías y precios
- ✅ **Sección de Productos**: Paquetes promocionales con descuentos y badges
- ✅ **Formulario de Contacto**: Validación, envío a API, mensajes de éxito/error
- ✅ **Footer Completo**: Información de contacto, enlaces rápidos, redes sociales
- ✅ **WhatsApp Flotante**: Botón fijo para contacto directo por WhatsApp
- ✅ **Integración WhatsApp**: Mensajes predefinidos para servicios y productos

### 🎨 Diseño

- ✅ **Mobile-First**: Diseño responsive para todas las pantallas
- ✅ **Tailwind CSS**: Utilidades y componentes personalizados
- ✅ **Animaciones**: Transiciones suaves con animate.css
- ✅ **Colores de Marca**: Paleta primaria (azul) y secundaria (verde)
- ✅ **Tipografía**: Inter (body) y Poppins (headings) desde Google Fonts

### 🔍 SEO Optimizado

- ✅ **Meta Tags**: Title, description, keywords optimizados
- ✅ **Open Graph**: Para compartir en redes sociales
- ✅ **Twitter Cards**: Optimizado para Twitter
- ✅ **Schema.org**: Datos estructurados (Organization, Service, etc.)
- ✅ **Sitemap.xml**: Indexación de páginas
- ✅ **Robots.txt**: Control de rastreo de bots
- ✅ **Canonical URLs**: Evitar contenido duplicado
- ✅ **HTML Semántico**: Estructura correcta con header, main, section, footer

## 🚦 Comandos

### Instalación

```bash
# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Servidor de desarrollo (http://localhost:4200)
npm start

# Build en modo watch
npm run watch
```

### Producción

```bash
# Build para producción
npm run build

# Los archivos compilados estarán en dist/gm-soluciones/browser/
```

### Testing

```bash
# Ejecutar tests
npm test
```

## 📝 Gestión de Contenido

### Actualizar Información de la Empresa

Edita `public/assets/data/company-info.json`:

```json
{
  "name": "SolucionesGM",
  "tagline": "Tu nuevo tagline",
  "description": "Nueva descripción...",
  "contact": {
    "email": "nuevo@email.com",
    "phone": "+34 XXX XXX XXX",
    "whatsapp": "+34XXXXXXXXX"
  }
}
```

### Agregar/Editar Servicios

Edita `public/assets/data/services.json`:

```json
{
  "services": [
    {
      "id": "nuevo-servicio",
      "title": "Nuevo Servicio",
      "shortDescription": "Descripción corta",
      "description": "Descripción larga...",
      "icon": "🚀",
      "features": ["Feature 1", "Feature 2"],
      "technologies": ["Tech1", "Tech2"],
      "pricing": {
        "from": 1000,
        "currency": "EUR",
        "unit": "proyecto"
      },
      "featured": true
    }
  ]
}
```

### Agregar/Editar Productos

Edita `public/assets/data/products.json`:

```json
{
  "products": [
    {
      "id": "nuevo-producto",
      "name": "Nuevo Producto",
      "category": "Categoría",
      "tagline": "Tagline",
      "description": "Descripción...",
      "price": {
        "regular": 5000,
        "promotional": 3999,
        "currency": "EUR"
      },
      "discount": 20,
      "featured": true,
      "promoted": true,
      "includes": ["Item 1", "Item 2"],
      "deliveryTime": "4 semanas",
      "badge": "NUEVO"
    }
  ]
}
```

## 🔗 Integración WhatsApp

El botón de WhatsApp utiliza la API de WhatsApp Web/Mobile:

```typescript
// Ejemplo de mensaje predefinido
const message = "¡Hola! Me gustaría obtener más información sobre Desarrollo Web.";
const whatsappUrl = `https://wa.me/34123456789?text=${encodeURIComponent(message)}`;
```

Para cambiar el número de WhatsApp, edita `public/assets/data/company-info.json`:

```json
{
  "contact": {
    "whatsapp": "+34XXXXXXXXX"  // Sin espacios ni guiones
  }
}
```

## 📊 SEO - Checklist de Implementación

### ✅ Completado

- [x] Meta tags en index.html
- [x] Open Graph y Twitter Cards
- [x] Servicio SEO con actualización dinámica
- [x] Datos estructurados (Schema.org)
- [x] Sitemap.xml
- [x] Robots.txt
- [x] HTML semántico
- [x] URLs amigables
- [x] Mobile responsive

### 📋 Pendiente (Según SEO-GUIDE.md)

- [ ] Configurar Google Analytics 4
- [ ] Configurar Google Search Console
- [ ] Crear imágenes optimizadas (WebP/AVIF)
- [ ] Agregar logo real en `/assets/images/logo.svg`
- [ ] Crear og-image.jpg (1200x630px)
- [ ] Configurar Google My Business
- [ ] Implementar estrategia de contenidos (blog)
- [ ] Link building

**📚 Para una guía completa de SEO, consulta el archivo `SEO-GUIDE.md`**

## 🎨 Personalización de Estilos

### Colores de Marca

Edita `tailwind.config.js` para cambiar los colores:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#0073ff',  // Color principal
        600: '#005ccc',
        // ...
      },
      secondary: {
        500: '#22c55e',  // Color secundario
        // ...
      }
    }
  }
}
```

### Clases Utility Personalizadas

Edita `src/styles.sass` para agregar clases globales:

```sass
@layer components
  .mi-clase-custom
    @apply px-4 py-2 bg-primary-600 text-white rounded-lg
```

## 🌐 Deployment

### Netlify

```bash
# Build command
npm run build

# Publish directory
dist/gm-soluciones/browser
```

### Vercel

```bash
# Framework Preset: Angular
# Build Command: npm run build
# Output Directory: dist/gm-soluciones/browser
```

### Servidor Tradicional (Apache/Nginx)

1. Ejecuta `npm run build`
2. Copia el contenido de `dist/gm-soluciones/browser/` a tu servidor
3. Configura el servidor para SPA (redirect all to index.html)

#### Ejemplo Nginx:

```nginx
server {
  listen 80;
  server_name solucionesgm.com;
  
  root /var/www/solucionesgm;
  index index.html;
  
  location / {
    try_files $uri $uri/ /index.html;
  }
  
  # Cache assets
  location /assets/ {
    expires 1y;
    add_header Cache-Control "public, immutable";
  }
}
```

## 📈 Monitoreo y Analytics

### Google Analytics 4

Agregar en `src/index.html` antes del cierre de `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Tag Manager

Agregar después del `<body>` en `src/index.html`:

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-XXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## 🐛 Troubleshooting

### El sitio no carga en desarrollo

```bash
# Verificar que el puerto 4200 esté libre
# Reiniciar el servidor
npm start
```

### Los estilos de Tailwind no aparecen

```bash
# Verificar que tailwind.config.js está correctamente configurado
# Asegurar que src/styles.sass incluye las directivas de Tailwind
```

### Los datos JSON no se cargan

```bash
# Verificar que los archivos JSON están en public/assets/data/
# Verificar la consola del navegador para errores HTTP
# Asegurar que DataService está inyectado correctamente
```

## 🤝 Contribución

Este es un proyecto corporativo. Para contribuciones:

1. Crear una rama con el nombre de la feature: `git checkout -b feature/nueva-funcionalidad`
2. Realizar los cambios y commit: `git commit -m "feat: descripción"`
3. Push a la rama: `git push origin feature/nueva-funcionalidad`
4. Crear un Pull Request

## 📄 Licencia

© 2026 SolucionesGM. Todos los derechos reservados.

## 📞 Contacto

- **Email**: contacto@solucionesgm.com
- **Teléfono**: +34 123 456 789
- **WhatsApp**: +34 123 456 789
- **Sitio Web**: https://www.solucionesgm.com

---

**Última actualización**: 22 de febrero de 2026

Para preguntas sobre SEO y optimización, consulta `SEO-GUIDE.md`
