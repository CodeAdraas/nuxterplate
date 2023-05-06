import gsap from 'gsap'
import { defineNuxtPlugin } from 'nuxt/app'
import { Intersect } from '../composables/scroll'

type AnimationTypes = 'fade-in' | 'fade-in-up'

const setStrategies = {
    'fade-in': (el: HTMLElement) => gsap.set(el, {
        opacity: 0
    }),
    'fade-in-up': (el: HTMLElement) => gsap.set(el, {
        opacity: 0,
        y: '25%'
    }),
}

const toStrategies = {
    'fade-in': (el: HTMLElement) => gsap.to(el, {
        opacity: 1
    }),
    'fade-in-up': (el: HTMLElement) => gsap.to(el, { 
        opacity: 1,
        y: 0
    })
}

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive('animation', {
        mounted(el, { value }: { value: AnimationTypes }) {
            const intersection = new Intersect(el, 0)
            setStrategies[value](el)
            intersection.enter(
                () => toStrategies[value](el)
            )
            el.__kill_intersection = () => intersection.destroy()
        },
        unmounted(el) {
            el.__kill_intersection()
        }
    })
})