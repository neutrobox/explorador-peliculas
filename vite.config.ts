import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite({
      routesDirectory: './src/routes',
      generatedRouteTree: './src/routeTree.gen.ts',
    })
  ],
  build: {
    // Optimize for CSR
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          query: ['@tanstack/react-query'],
          ui: ['@radix-ui/themes', '@radix-ui/react-icons'],
        },
      },
    },
    // Generate source maps for better debugging
    sourcemap: true,
  },
  // Optimize dev server for SPA
  server: {
    // Enable history API fallback for client-side routing
    historyApiFallback: true,
  },
  // Ensure proper handling of environment variables
  define: {
    // Ensure we're building for client-side
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
})
