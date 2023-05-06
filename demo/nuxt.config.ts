export default defineNuxtConfig({
    extends: ['nuxt-seo-kit'],

    runtimeConfig: {
        public: {
            creditTheme: 'blue'
        }
    },

    modules: [
        '~/../src/module'
    ],

    ssr: true,
    sourcemap: false,
})