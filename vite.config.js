import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: "/AL-Detallado-Automotriz/",
  plugins: [tailwindcss()],
  server: {
    host: true,
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        services: resolve(__dirname, "services.html"),
        gallery: resolve(__dirname, "gallery.html"),
        contact: resolve(__dirname, "contact.html"),
        about: resolve(__dirname, "about-us.html"),
        terms: resolve(__dirname, "terms.html"),
      },
    },
  },
});
