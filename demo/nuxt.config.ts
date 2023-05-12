import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
    extends: ['nuxt-seo-kit'],

    runtimeConfig: {
        public: {
            creditTheme: 'invisible',
            captcha: {
                sitekey: '1x00000000000000000000AA'
            },
            fimbox: {
                url: 'http://localhost:8080'
            }
        }
    },

    modules: [
        '~/../src/module',
    ],

    ssr: true,
    sourcemap: false,
})