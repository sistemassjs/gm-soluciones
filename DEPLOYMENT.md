# Configuración de Despliegue en GitHub Pages

## ✅ Optimizaciones Aplicadas

### 1. **Workflow de GitHub Actions Mejorado**
- Usa el método oficial de GitHub Pages (`actions/deploy-pages`)
- Separación de jobs de build y deploy para mejor trazabilidad
- Archivo `.nojekyll` para evitar el procesamiento de Jekyll
- Copia de `index.html` a `404.html` para SPA routing

### 2. **Configuración de Producción Optimizada**
- `optimization: true` - Minificación y tree-shaking
- `sourceMap: false` - Reduce tamaño de build
- `namedChunks: false` - Nombres de chunks más cortos
- `extractLicenses: true` - Extrae licencias a archivo separado
- `outputHashing: "all"` - Cache busting para actualizaciones

### 3. **Comando de Build**
```bash
npm run build:github-pages
```
Este comando ejecuta:
```bash
ng build --configuration production --base-href /gm-soluciones/
```

## 📋 Pasos para Desplegar

### Configuración Inicial (Solo una vez)

1. **Configurar GitHub Pages en el repositorio:**
   - Ve a Settings → Pages
   - Source: **GitHub Actions** (no "Deploy from a branch")
   - Guarda los cambios

2. **Verificar permisos de GitHub Actions:**
   - Ve a Settings → Actions → General
   - En "Workflow permissions" selecciona: **Read and write permissions**
   - Marca: **Allow GitHub Actions to create and approve pull requests**
   - Guarda los cambios

### Despliegue Automático

Cada vez que hagas push a la rama `master`, el workflow se ejecutará automáticamente:

```bash
git add .
git commit -m "Descripción de cambios"
git push origin master
```

### Despliegue Manual

Puedes ejecutar el workflow manualmente desde GitHub:
1. Ve a Actions → Deploy to GitHub Pages
2. Click en "Run workflow"
3. Selecciona la rama `master`
4. Click en "Run workflow"

## 🔍 Verificar el Despliegue

1. **Ver el progreso:**
   - GitHub → Actions → Último workflow
   - Revisa los logs de cada paso

2. **Acceder a la página:**
   - URL: `https://[tu-usuario].github.io/gm-soluciones/`
   - Espera 1-2 minutos después de que el workflow termine

## ⚠️ Solución de Problemas Comunes

### La página muestra 404
- Verifica que GitHub Pages esté configurado en "GitHub Actions" (no rama)
- Asegúrate de que el workflow haya completado exitosamente
- Espera unos minutos, GitHub Pages puede tardar en actualizar

### Los recursos no cargan (CSS, JS, imágenes)
- Verifica que el `base-href` en `package.json` sea `/gm-soluciones/`
- Asegúrate de que las rutas de assets sean relativas (sin `/` al inicio)
- El archivo `.nojekyll` debe estar presente en el build

### El routing no funciona (404 en rutas)
- El workflow copia `index.html` a `404.html` automáticamente
- Verifica que esto suceda revisando los logs del workflow

### El build falla
- Revisa los logs en GitHub Actions
- Ejecuta localmente: `npm run build:github-pages`
- Verifica que no haya errores de TypeScript o linting

## 🚀 Optimizaciones Adicionales

### Cache de Node Modules
El workflow ya incluye cache de npm para builds más rápidos.

### Builds Incrementales
Solo se ejecutan builds cuando hay cambios en la rama `master`.

### Concurrencia
Solo un despliegue a la vez para evitar conflictos.

## 📊 Monitoreo

- **Tiempo estimado de build:** 2-5 minutos
- **Tiempo de despliegue:** 1-2 minutos adicionales
- **Total:** 3-7 minutos desde push hasta página actualizada

## 🔗 Enlaces Útiles

- [GitHub Pages Docs](https://docs.github.com/es/pages)
- [Angular Deployment Guide](https://angular.dev/tools/cli/deployment)
- [GitHub Actions Workflow Syntax](https://docs.github.com/es/actions/reference/workflow-syntax-for-github-actions)
