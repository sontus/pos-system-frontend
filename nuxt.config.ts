// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.NUXT_API_BASE_URL || "http://pos-system-api.test/api/v1",
    },
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  alias: {
    assets: "/<rootDir>/assets",
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
