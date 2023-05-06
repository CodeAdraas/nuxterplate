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
        name: 'util-scroll-text-reveal-lines',
        filePath: resolver.resolve('components/util-scroll/text/reveal-lines.vue')
    }),
    (resolver: Resolver) => ({
        name: 'util-scroll-text-reveal-words',
        filePath: resolver.resolve('components/util-scroll/text/reveal-words.vue')
    }),
    (resolver: Resolver) => ({
        name: 'util-scroll-text-reveal-letters',
        filePath: resolver.resolve('components/util-scroll/text/reveal-letters.vue')
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
        nuxt.options.css.push(resolver.resolve('breakpoint.css'))
        for (let opt of components) addComponent(opt(resolver))
        addImportsDir(resolver.resolve('composables'))
        addPlugin(resolver.resolve('plugins/breakpoint'))
        addPlugin(resolver.resolve('plugins/browser'))
        addPlugin(resolver.resolve('plugins/animation'))
    }
})