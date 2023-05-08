<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import DevCredit from '../dev-credit/component.vue'
import CfTurnstileGlobal from '../cf-turnstile-global/component.vue'

interface Props {
    globalTurnstile?: boolean
}

defineProps<Props>()

const runtimeConfig = useRuntimeConfig()
</script>

<template>
    <!-- SEO -->
    <seo-kit />
    <!-- User interface -->
    <Header />
    <slot />
    <Footer />
    <!-- Invisible global Cf Turnstile captcha -->
    <cf-turnstile-global
        v-if="globalTurnstile"
        appearance="interaction-only"
    />
    <!-- Developer credit -->
    <dev-credit :theme="runtimeConfig.public?.devCreditTheme || 'default'" />
</template>