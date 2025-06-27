# 🎬 Explorador de Películas

Una aplicación web moderna para explorar, buscar y gestionar tu lista personal de películas favoritas. Construida con React, TypeScript y TanStack Router.

![Explorador de Películas](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-7.0.0-646CFF?logo=vite)
![TanStack Router](https://img.shields.io/badge/TanStack_Router-Latest-FF6B6B)

## ✨ Características

- 🎯 **Exploración de Películas**: Navega por las películas más populares
- 🔍 **Búsqueda Avanzada**: Busca por título, género, año y calificación
- 📚 **Lista Personal**: Guarda tus películas favoritas para ver más tarde
- 📱 **Responsive Design**: Optimizado para móviles, tablets y desktop
- 🌙 **Dark Mode**: Interfaz moderna con tema oscuro
- ⚡ **Performance**: Client-Side Rendering con lazy loading
- 🎨 **UI Moderna**: Diseño elegante con Radix UI y gradientes

## 🚀 Demo

[Ver Demo en Vivo](https://tu-demo-url.com) <!-- Actualizar con la URL real -->

## 📸 Screenshots

<!-- Agregar screenshots aquí -->

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Routing**: TanStack Router (Type-safe routing)
- **State Management**: TanStack Query (Server state)
- **UI Components**: Radix UI + Radix Themes
- **Styling**: CSS-in-JS con Radix Themes
- **Build Tool**: Vite
- **API**: The Movie Database (TMDB) API

## 📋 Prerequisitos

- Node.js 18+ 
- npm o yarn
- API Key de TMDB (gratuita)

## 🔧 Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/tu-usuario/explorador-peliculas.git
   cd explorador-peliculas
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita `.env` y agrega tu API key de TMDB:
   ```env
   VITE_TMDB_API_KEY=tu_api_key_aqui
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

5. **Abre tu navegador**
   ```
   http://localhost:5173
   ```

## 🎯 Scripts Disponibles

```bash
# Desarrollo
npm run dev              # Inicia servidor de desarrollo
npm run dev --host       # Servidor accesible desde la red

# Build
npm run build            # Build para producción
npm run build:analyze    # Build con análisis de bundle
npm run preview          # Preview del build de producción

# Calidad de código
npm run lint             # Ejecuta ESLint
npm run type-check       # Verificación de tipos TypeScript
```

## 🗂️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── MovieCard.tsx   # Tarjeta de película
│   ├── MovieGrid.tsx   # Grid de películas
│   ├── SearchFilters.tsx # Filtros de búsqueda
│   └── ...
├── routes/             # Rutas de la aplicación
│   ├── __root.tsx      # Layout principal
│   ├── index.tsx       # Página de inicio
│   ├── search.tsx      # Página de búsqueda
│   ├── watchlist.tsx   # Lista personal
│   └── movie/
│       └── $movieId.tsx # Detalles de película
├── hooks/              # Custom hooks
├── lib/                # Utilidades y configuración
├── types/              # Definiciones de TypeScript
└── main.tsx           # Punto de entrada
```

## 🌐 API

Esta aplicación utiliza [The Movie Database (TMDB) API](https://www.themoviedb.org/documentation/api).

### Obtener API Key

1. Crea una cuenta en [TMDB](https://www.themoviedb.org/)
2. Ve a tu perfil → Configuración → API
3. Solicita una API key (es gratuita)
4. Copia tu API key al archivo `.env`

## 🚀 Deployment

La aplicación está configurada como SPA (Single Page Application) y puede ser deployada en:

### Netlify
```bash
npm run build
# Sube la carpeta dist/ a Netlify
```

### Vercel
```bash
npm run build
# Conecta tu repositorio a Vercel
```

### Otros proveedores
Ver [CSR-DEPLOYMENT.md](./CSR-DEPLOYMENT.md) para instrucciones detalladas.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🙏 Agradecimientos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) por la API
- [Radix UI](https://www.radix-ui.com/) por los componentes
- [TanStack](https://tanstack.com/) por Router y Query
- [Vite](https://vitejs.dev/) por la herramienta de build
