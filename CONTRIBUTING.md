# 🤝 Contribuir al Explorador de Películas

¡Gracias por tu interés en contribuir! Este documento te guiará a través del proceso de contribución.

## 📋 Código de Conducta

Este proyecto se adhiere a un código de conducta. Al participar, se espera que mantengas este código.

## 🚀 Cómo Contribuir

### Reportar Bugs

1. **Verifica** que el bug no haya sido reportado anteriormente
2. **Abre un issue** con una descripción clara del problema
3. **Incluye** pasos para reproducir el bug
4. **Agrega** capturas de pantalla si es relevante

### Sugerir Mejoras

1. **Abre un issue** describiendo la mejora propuesta
2. **Explica** por qué sería útil para el proyecto
3. **Proporciona** ejemplos de uso si es posible

### Pull Requests

1. **Fork** el repositorio
2. **Crea** una rama desde `main`:
   ```bash
   git checkout -b feature/mi-nueva-caracteristica
   ```
3. **Realiza** tus cambios siguiendo las guías de estilo
4. **Agrega** tests si es necesario
5. **Asegúrate** de que todos los tests pasen:
   ```bash
   npm run lint
   npm run type-check
   npm run build
   ```
6. **Commit** tus cambios con mensajes descriptivos
7. **Push** a tu fork y abre un Pull Request

## 🎯 Guías de Desarrollo

### Configuración del Entorno

```bash
# Clona tu fork
git clone https://github.com/tu-usuario/explorador-peliculas.git
cd explorador-peliculas

# Instala dependencias
npm install

# Configura variables de entorno
cp .env.example .env
# Edita .env con tu API key de TMDB

# Inicia el servidor de desarrollo
npm run dev
```

### Estilo de Código

- **TypeScript**: Usa tipos estrictos
- **React**: Componentes funcionales con hooks
- **Naming**: camelCase para variables, PascalCase para componentes
- **Imports**: Organiza imports (externos, internos, relativos)

### Estructura de Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: agrega filtro por director
fix: corrige error en búsqueda
docs: actualiza README
style: mejora estilos del header
refactor: reorganiza componentes
test: agrega tests para MovieCard
```

### Testing

- Agrega tests para nuevas funcionalidades
- Asegúrate de que los tests existentes pasen
- Usa nombres descriptivos para los tests

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
src/
├── components/     # Componentes reutilizables
├── routes/        # Rutas de TanStack Router
├── hooks/         # Custom hooks
├── lib/           # Utilidades y configuración
├── types/         # Definiciones TypeScript
└── main.tsx       # Punto de entrada
```

### Tecnologías Principales

- **React 19** + **TypeScript**
- **TanStack Router** para routing
- **TanStack Query** para estado del servidor
- **Radix UI** para componentes
- **Vite** para build

## 🎨 Guías de UI/UX

- **Dark Mode**: Mantén consistencia con el tema oscuro
- **Responsive**: Asegúrate de que funcione en móviles
- **Accesibilidad**: Usa componentes accesibles de Radix UI
- **Performance**: Optimiza imágenes y lazy loading

## 📝 Documentación

- Actualiza el README si agregas nuevas características
- Documenta APIs y componentes complejos
- Agrega comentarios para lógica compleja

## ❓ ¿Necesitas Ayuda?

- Abre un issue con la etiqueta "question"
- Revisa issues existentes
- Consulta la documentación de las tecnologías usadas

## 🙏 Reconocimientos

Todos los contribuidores serán reconocidos en el README del proyecto.

¡Gracias por contribuir! 🎉
