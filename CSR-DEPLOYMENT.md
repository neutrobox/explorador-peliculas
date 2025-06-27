# Client-Side Rendering (CSR) Deployment Guide

Esta aplicación está configurada para funcionar completamente como una Single Page Application (SPA) con Client-Side Rendering.

## 🚀 Configuración CSR

### Router Configuration
- **TanStack Router** configurado para CSR completo
- Preload de rutas con `defaultPreload: 'intent'`
- Context compartido con React Query
- Manejo de rutas 404 personalizado

### Build Optimization
- Chunks manuales para mejor caching
- Source maps habilitados
- Optimización para SPA en Vite

## 📦 Deployment en diferentes plataformas

### Netlify
- Archivo `public/_redirects` incluido
- Configuración automática para SPA

### Vercel
- Archivo `vercel.json` incluido
- Rewrites configurados para client-side routing

### Apache
- Archivo `public/.htaccess` incluido
- Mod_rewrite configurado para SPA

### Nginx
Agregar a la configuración del servidor:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### GitHub Pages
Requiere configuración adicional:
1. Crear `public/404.html` que redirija a `index.html`
2. Usar hash routing si es necesario

## 🛠️ Scripts disponibles

```bash
# Desarrollo con host habilitado
npm run dev

# Build para producción
npm run build

# Build con análisis
npm run build:analyze

# Preview del build
npm run preview

# Type checking
npm run type-check
```

## 🔧 Variables de entorno

Asegúrate de configurar:
```env
VITE_TMDB_API_KEY=tu_api_key_aqui
```

## 📱 Características CSR

- ✅ Routing completamente en el cliente
- ✅ Lazy loading de rutas
- ✅ Preload inteligente
- ✅ Manejo de errores 404
- ✅ Optimización de chunks
- ✅ Cache de queries con React Query
- ✅ Fallback de loading en HTML

## 🎯 Performance

- Code splitting automático
- Preconnect a APIs externas
- Compresión habilitada
- Cache headers optimizados
- Chunks separados por funcionalidad

## 🔍 Debugging

- Source maps habilitados en desarrollo y producción
- Router devtools disponibles en desarrollo
- React Query devtools integradas
