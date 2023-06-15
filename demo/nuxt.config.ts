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
            formDrop: {
                url: process.env.FORMDROP_URL,
                formId: process.env.FORMDROP_FORMID
            }
        }
    },

    modules: [
        '~/../src/module',
    ],

    ssr: true,
    sourcemap: false,
})