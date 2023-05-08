<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useTurnstile } from '../../composables/turnstile';

type Appearance = 'always' | 'execute' | 'interaction-only'
type Theme = 'auto' | 'light' | 'dark'
type Language = 'auto' | 'en' | 'de' | 'nl'

interface Props {
    sitekey: string
    appearance?: Appearance,
    theme?: Theme,
    lang?: Language
}

interface Emits {
    (e: 'verify', token: string): void
    (e: 'expire'): void
    (e: 'fail'): void
}

const prop = withDefaults(defineProps<Props>(), {
    appearance: 'always',
    theme: 'auto',
    lang: 'auto'
})
const emit = defineEmits<Emits>()

const renderTurnstile = () => {
    // @ts-ignore
    window.onloadTurnstileCallback = () => {
        // @ts-ignore
        window.turnstile?.render("#turnstile-box", {
            'sitekey': prop.sitekey,
            'appearance': prop.appearance,
            'theme': prop.theme,
            'language': prop.lang,
            'callback': (token: string) => emit('verify', token),
            'expired-callback': () => emit('expire'),
            'error-callback': () => emit('fail')
        })
    }
}

onMounted(() => {
    // @ts-ignore
    if (window.turnstile === null || !window.turnstile) {
        const script = document.createElement('script')
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
        script.async = true
        script.defer = true
        document.head.appendChild(script)
    }
    renderTurnstile()
})

// @ts-ignore
onBeforeUnmount(() => {
    if (! useTurnstile().useGlobal) {
        // @ts-ignore
        delete window.turnstile
    }
})
</script>

<template>
    <div id="turnstile-box" />
</template>