import {
    defineNuxtModule,
    createResolver,
    addComponent,
    addImportsDir,
    addPlugin,
} from '@nuxt/kit'

const components = [
    ['Icon', './components/icon/component.vue'],
    ['UtilLazyImage', './components/util-lazy-image/component.vue'],
    ['UtilScrollTextRevealLines', './components/util-scroll/text/reveal-lines.vue'],
    ['UtilScrollTextRevealWords', './components/util-scroll/text/reveal-words.vue'],
    ['UtilScrollTextRevealLetters', './components/util-scroll/text/reveal-letters.vue'],
    ['UtilSlider', './components/util-slider/component.vue'],
    ['CfTurnstile', './components/cf-turnstile/component.vue'],
    ['CfTurnstileGlobal', './components/cf-turnstile-global/component.vue'],
    ['Faq', './components/faq/component.vue'],
    ['DevCredit', './components/dev-credit/component.vue'],
    ['BaseLayout', './components/base-layout/component.vue'],
    ['Form', './components/form/component.vue'],
    ['FormInput', './components/form/input.vue'],
    ['FormMultiSelect', './components/form/multi-select.vue'],
    ['FimboxForm', './components/fimbox-form/component.vue'],
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

        for (let [name, filePath] of components) addComponent({
            name,
            filePath: resolver.resolve(filePath)
        })

        addImportsDir(resolver.resolve('composables'))

        addPlugin(resolver.resolve('plugins/window'))
        addPlugin(resolver.resolve('plugins/browser'))
        addPlugin(resolver.resolve('plugins/breakpoint'))
        addPlugin(resolver.resolve('plugins/animate'))
    }
})