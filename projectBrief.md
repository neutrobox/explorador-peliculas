<!-- projectBrief.md -->
# Project Brief: Explorador de Películas con TMDB

## 1. Resumen del Proyecto

Este documento describe el desarrollo de una aplicación web moderna y responsiva llamada "Explorador de Películas". La aplicación permitirá a los usuarios descubrir, buscar y organizar películas utilizando la API pública de The Movie Database (TMDB). El objetivo es crear una experiencia de usuario fluida, rápida e intuitiva.

## 2. Objetivos Principales

- **Descubrimiento de Contenido:** Ofrecer a los usuarios una forma visualmente atractiva de explorar películas populares o de tendencia.
- **Búsqueda Eficiente:** Implementar una funcionalidad de búsqueda potente con filtros avanzados para que los usuarios encuentren exactamente lo que buscan.
- **Información Detallada:** Proporcionar vistas completas para cada película, incluyendo sinopsis, reparto, calificaciones y más.
- **Organización Personal:** Permitir a los usuarios crear y gestionar una "watchlist" personal para guardar películas de su interés.

## 3. Características Clave (Features)

### 3.1. Grid Principal de Películas
- **Ruta:** `/`
- **Funcionalidad:**
    - Al cargar la aplicación, se mostrará un grid con las películas más populares del momento, obtenidas del endpoint `movie/popular` de la API de TMDB.
    - Cada tarjeta de película en el grid mostrará como mínimo el póster, el título y el año de lanzamiento.
    - Se implementará paginación o scroll infinito para cargar más resultados.

### 3.2. Búsqueda y Filtros Avanzados
- **Ruta:** `/search`
- **Funcionalidad:**
    - Un campo de texto permitirá buscar películas por título (`search/movie`).
    - Se incluirán controles (sliders, dropdowns, checkboxes) para filtrar los resultados por:
        - Género.
        - Rango de año de lanzamiento.
        - Calificación de usuarios (rango de puntuación).
    - Los resultados de la búsqueda se actualizarán dinámicamente a medida que el usuario interactúa con los filtros.
    - Los parámetros de búsqueda y filtro se gestionarán a través de los *search params* de la URL para que las búsquedas puedan ser compartidas.

### 3.3. Página de Detalles de la Película
- **Ruta:** `/movie/:movieId` (Ruta dinámica)
- **Funcionalidad:**
    - Al hacer clic en una película (desde el grid o los resultados de búsqueda), el usuario será redirigido a su página de detalles.
    - Esta página mostrará información completa obtenida del endpoint `movie/{movie_id}`:
        - Póster en alta resolución y backdrop.
        - Título, sinopsis, duración, géneros.
        - Fecha de lanzamiento.
        - Calificación promedio.
        - Lista de actores principales (cast).
        - Botón para añadir/quitar de la watchlist.

### 3.4. Watchlist (Lista de seguimiento)
- **Ruta:** `/watchlist`
- **Funcionalidad:**
    - Los usuarios podrán añadir o eliminar cualquier película a su watchlist personal.
    - La watchlist se persistirá localmente en el navegador del usuario utilizando `localStorage`. No se requiere autenticación de usuario.
    - La página de la watchlist mostrará un grid con todas las películas que el usuario ha guardado.

## 4. Stack Tecnológico

- **Framework Frontend:** **React** (con **Vite** como herramienta de construcción).
- **Enrutamiento:** **TanStack Router** para un enrutamiento 100% type-safe, gestión de *search params* y carga de datos integrada.
- **Componentes UI:** **Radix UI** para construir primitivas de UI accesibles y sin estilos (como Dialogs, Dropdown Menus, Sliders, etc.).
- **Obtención de Datos:** Se recomienda **TanStack Query** para gestionar el estado del servidor (cache, revalidación, etc.), que se integra perfectamente con TanStack Router.
- **Estilos:** Se recomienda **Tailwind CSS** por su enfoque *utility-first* que complementa muy bien a Radix UI.
- **API Externa:** **The Movie Database (TMDB) API V3**.

## 5. Arquitectura y Estructura de Rutas

La aplicación se estructurará en torno a las rutas definidas por **TanStack Router**:

- `src/routes/`
    - `__root.tsx`: Layout principal de la aplicación (ej. header, footer).
    - `index.tsx`: Ruta para el grid principal (`/`).
    - `search.tsx`: Ruta para la página de búsqueda (`/search`).
    - `watchlist.tsx`: Ruta para la página de la watchlist (`/watchlist`).
    - `movie/`
        - `$movieId.tsx`: Ruta dinámica para los detalles de la película (`/movie/:movieId`).

## 6. Supuestos y Limitaciones

- La aplicación será puramente *client-side*.
- No se implementará un sistema de autenticación de usuarios. La watchlist es local al dispositivo y navegador.
- Se requiere una clave de API de TMDB, la cual se gestionará a través de variables de entorno (`VITE_TMDB_API_KEY`).
- El diseño debe ser *mobile-first* y responsivo.