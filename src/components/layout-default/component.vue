<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import Captcha from '../captcha/component.vue'
import DevCredit from '../dev-credit/component.vue'

interface Props {
    credits?: boolean
}

withDefaults(defineProps<Props>(), {
    credits: true
})

const runtimeConfig = useRuntimeConfig()
</script>

<template>
    <seo-kit />
    <Header />
    <slot />
    <Footer />
    <captcha
        v-if="runtimeConfig.public.captcha?.global"
        global
    />
    <dev-credit v-if="credits" />
</template>