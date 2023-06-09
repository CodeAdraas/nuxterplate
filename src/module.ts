import {
    defineNuxtModule,
    createResolver,
    addComponent,
    addImportsDir,
    addPlugin,
} from '@nuxt/kit'

interface NuxterplateModuleOptions {
    cmsCss?: boolean
}

const components = [
    ['Icon', './components/icon/component.vue'],
    ['UtilLazyImage', './components/util-lazy-image/component.vue'],
    ['ScrollTextRevealLines', './components/scroll/text/reveal-lines.vue'],
    ['ScrollTextRevealWords', './components/scroll/text/reveal-words.vue'],
    ['ScrollTextRevealLetters', './components/scroll/text/reveal-letters.vue'],
    ['UtilSlider', './components/util-slider/component.vue'],
    ['Captcha', './components/captcha/component.vue'],
    ['Faq', './components/faq/component.vue'],
    ['DevCredit', './components/dev-credit/component.vue'],
    ['LayoutDefault', './components/layout-default/component.vue'],
    ['Form', './components/form/component.vue'],
    ['FormInput', './components/form/input.vue'],
    ['FormMultiSelect', './components/form/multi-select.vue'],
    ['FormDrop', './components/form-drop/component.vue'],
]

export default defineNuxtModule<NuxterplateModuleOptions>({
    meta: {
        name: 'nuxterplate',
        compatibility: {
            nuxt: '^3.4.3'
        }
    },
    defaults: nuxt => ({
        cmsCss: true
    }),
    setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.options.css.push('swiper/css')
        nuxt.options.css.push(resolver.resolve('assets/css/breakpoint.css'))
        if (moduleOptions.cmsCss) {
            nuxt.options.css.push(resolver.resolve('assets/css/cms.css'))
        }

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