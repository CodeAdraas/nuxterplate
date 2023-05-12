<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount } from 'vue'
import { createError } from 'nuxt/app';

type Appearance =
    | 'always'
    | 'execute'
    | 'interaction-only'
type Theme =
    | 'auto'
    | 'light'
    | 'dark'
type Language =
    | 'auto'
    | 'en'
    | 'de'
    | 'nl'

interface Emits {
    (e: 'verify', token: string): void
    (e: 'expire'): void
    (e: 'fail'): void
}

interface Props {
    sitekey: string
    appearance?: Appearance,
    theme?: Theme,
    lang?: Language
}

const emit = defineEmits<Emits>()
const prop = withDefaults(defineProps<Props>(), {
    appearance: 'always',
    theme: 'auto',
    lang: 'auto'
})

const widgetId = `#turnstile-widget`
const scriptId = '#turnstile-script'

const renderTurnstile = () => {
    // @ts-ignore
    window.turnstile?.render(widgetId, {
        'sitekey': prop.sitekey,
        'appearance': prop.appearance,
        'theme': prop.theme,
        'language': prop.lang,
        'callback': (token: string) => emit('verify', token),
        'expired-callback': () => emit('expire'),
        'error-callback': () => emit('fail')
    })
}

onMounted(() => {
    if (!prop.sitekey) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Turnstile captcha sitekey could not be resolved',
            fatal: true
        })
    }

    if (!document.querySelector(scriptId)) {
        const script = document.createElement('script')
        script.id = 'turnstile-script'
        script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback'
        script.async = true
        script.defer = true
        document.head.appendChild(script)

        // @ts-ignore
        window.onloadTurnstileCallback = () => renderTurnstile()
    }
    else {
        renderTurnstile()
    }
})

onBeforeUnmount(() => {
    // @ts-ignore
    window.turnstile.remove(widgetId)
})
</script>

<template>
    <div :id="widgetId.replace('#', '')" />
</template>