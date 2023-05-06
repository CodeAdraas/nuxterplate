import {
    defineNuxtModule,
    createResolver,
    addComponent,
    addImportsDir,
    addPlugin,
    type Resolver
} from '@nuxt/kit'

const components = [
    (resolver: Resolver) => ({
        name: 'Icon',
        filePath: resolver.resolve('components/icon/component.vue')
    }),
    (resolver: Resolver) => ({
        name: 'UtilLazyImage',
        filePath: resolver.resolve('components/util-lazy-image/component.vue')
    }),
    (resolver: Resolver) => ({
        name: 'UtilScrollTextRevealLines',
        filePath: resolver.resolve('components/util-scroll/text/reveal-lines.vue')
    }),
    (resolver: Resolver) => ({
        name: 'UtilScrollTextRevealWords',
        filePath: resolver.resolve('components/util-scroll/text/reveal-words.vue')
    }),
    (resolver: Resolver) => ({
        name: 'UtilScrollTextRevealLetters',
        filePath: resolver.resolve('components/util-scroll/text/reveal-letters.vue')
    }),
    (resolver: Resolver) => ({
        name: 'UtilSlider',
        filePath: resolver.resolve('components/util-slider/component.vue')
    }),
    (resolver: Resolver) => ({
        name: 'CfTurnstile',
        filePath: resolver.resolve('components/cf-turnstile/component.vue')
    }),
    (resolver: Resolver) => ({
        name: 'Faq',
        filePath: resolver.resolve('components/faq/component.vue')
    }),
    (resolver: Resolver) => ({
        name: 'AchmCredit',
        filePath: resolver.resolve('components/achm-credit/component.vue')
    }),
    (resolver: Resolver) => ({
        name: 'UtilLayout',
        filePath: resolver.resolve('components/util-layout/component.vue')
    })
]

export default defineNuxtModule({
    meta: {
        name: 'nuxterplate',
        compatibility: {
            nuxt: '^3.4.3'
        }
    },
    setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.options.css.push('swiper/css')
        nuxt.options.css.push(resolver.resolve('assets/breakpoint.css'))
        nuxt.options.css.push(resolver.resolve('assets/cms.css'))

        for (let opt of components) addComponent(opt(resolver))

        addImportsDir(resolver.resolve('composables'))

        addPlugin(resolver.resolve('plugins/window'))
        addPlugin(resolver.resolve('plugins/browser'))
        addPlugin(resolver.resolve('plugins/breakpoint'))
        addPlugin(resolver.resolve('plugins/animate'))
    }
})