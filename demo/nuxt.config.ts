import { defineNuxtConfig } from 'nuxt/config'
export default defineNuxtConfig({
    extends: ['nuxt-seo-kit'],

    runtimeConfig: {
        public: {
            creditTheme: 'invisible',
            captcha: {
                global: true,
                sitekey: '1x00000000000000000000AA'
            },
            fimbox: {
                url: process.env.FIMBOX_URL,
                tenantId: process.env.FIMBOX_URL
            }
        }
    },

    modules: [
        '~/../src/module',
    ],

    ssr: true,
    sourcemap: false,
})