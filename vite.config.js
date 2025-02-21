import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',  // Simulate browser-like environment
    setupFiles: './src/test/setup.js', // Custom setup for testing
    css: true, // Support for CSS modules
  },
})
