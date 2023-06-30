import {
    defineNuxtModule,
    createResolver,
    addComponent,
    addImportsDir,
    addPlugin,
} from '@nuxt/kit'

import type { Ref } from 'vue'
import type { Breakpoint, RangeArgs } from './composables/breakpoint'

interface BreakpointPlugin {
    current: Ref<Breakpoint>,
    is: (assertion: Breakpoint) => boolean,
    between: (...assertions: RangeArgs) => boolean
}

interface BrowserPlugin {
    name: string
    version: number
    versionNumber: string
    os: string
    mobile: boolean
    ios: boolean
    windows: boolean
}

declare module 'vue' {
	interface ComponentCustomProperties  {
		$window: Window;
		$browser: BrowserPlugin;
		$breakpoint: BreakpointPlugin;
	}
}

interface NuxterplateModuleOptions {
    swiper?: boolean
    cms?: boolean
}

const components = [
    ['Icon',                    './components/icon/component.vue'],
    ['UtilLazyImage',           './components/util-lazy-image/component.vue'],
    ['ScrollTextRevealLines',   './components/scroll/text/reveal-lines.vue'],
    ['ScrollTextRevealWords',   './components/scroll/text/reveal-words.vue'],
    ['ScrollTextRevealLetters', './components/scroll/text/reveal-letters.vue'],
    ['UtilSlider',              './components/util-slider/component.vue'],
    ['Captcha',                 './components/captcha/component.vue'],
    ['Faq',                     './components/faq/component.vue'],
    ['DevCredit',               './components/dev-credit/component.vue'],
    ['LayoutDefault',           './components/layout-default/component.vue'],
    ['Form',                    './components/form/component.vue'],
    ['FormInput',               './components/form/input.vue'],
    ['FormMultiSelect',         './components/form/multi-select.vue'],
    ['FormDrop',                './components/form-drop/component.vue'],
]

export default defineNuxtModule<NuxterplateModuleOptions>({
    meta: {
        name: 'nuxterplate',
        configKey: 'nuxterplate',
        compatibility: {
            nuxt: '^3.4.3'
        }
    },
    defaults: (_) => ({
        swiper: true,
        cms: true
    }),
    setup(moduleOptions, nuxt) {
        const resolver = createResolver(import.meta.url)

        nuxt.options.css.push(resolver.resolve('assets/css/breakpoint.css'))
        if (moduleOptions.swiper) {
            nuxt.options.css.push('swiper/css')
        }
        if (moduleOptions.cms) {
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