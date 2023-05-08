export default defineNuxtConfig({
    extends: ['nuxt-seo-kit'],

    runtimeConfig: {
        public: {
            devCreditTheme: 'invisible',
            turnstileSitekey: process.env.TURNSTILE_SITEKEY,
            fimboxAPIUrl: process.env.FIMBOX_API_URL
        }
    },

    modules: [
        '~/../src/module'
    ],

    ssr: true,
    sourcemap: false,
})