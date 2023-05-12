import { defineNuxtPlugin } from 'nuxt/app'
import { useBreakpoint, is, between } from '../composables/breakpoint'

export default defineNuxtPlugin(nuxtApp => {
    const breakpoint = useBreakpoint()
    nuxtApp.vueApp.config.globalProperties.$breakpoint = {
        current: breakpoint.current,
        is,
        between
    }
})