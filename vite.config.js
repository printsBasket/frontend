import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Route → HTML file mapping (used in both dev middleware and build inputs)
const pageRoutes = {
  '/about':        'about.html',
  '/contact-us':   'contact-us.html',
  '/shop/home':    'shop-home.html',
  '/shop/office':  'shop-office.html',
  '/shop/inkjet':  'shop-inkjet.html',
  '/shop/laser':   'shop-laser.html',
  '/shop':         'shop.html',
  '/blogs':        'blogs.html',
  '/faq':          'faq.html',
};

// Plugin: intercepts dev server requests and rewrites URLs to the correct HTML file
function multiPagePlugin() {
  return {
    name: 'multi-page-dev',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0]; // strip query params
        if (url && pageRoutes[url]) {
          req.url = '/' + pageRoutes[url];
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), multiPagePlugin()],
  build: {
    minify: 'esbuild',
    target: 'esnext',
    rollupOptions: {
      input: {
        main:        resolve(__dirname, 'index.html'),
        about:       resolve(__dirname, 'about.html'),
        contactUs:   resolve(__dirname, 'contact-us.html'),
        shop:        resolve(__dirname, 'shop.html'),
        shopHome:    resolve(__dirname, 'shop-home.html'),
        shopOffice:  resolve(__dirname, 'shop-office.html'),
        shopInkjet:  resolve(__dirname, 'shop-inkjet.html'),
        shopLaser:   resolve(__dirname, 'shop-laser.html'),
        blogs:       resolve(__dirname, 'blogs.html'),
        faq:         resolve(__dirname, 'faq.html'),
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          redux: ['redux', 'react-redux', 'redux-thunk'],
        }
      }
    }
  }
})

