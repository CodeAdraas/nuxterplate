<script setup lang="ts">
import Captcha from '../captcha/component.vue'
import DevCredit from '../dev-credit/component.vue'

interface Props {
    globalCaptcha?: boolean
    credits?: boolean
}

withDefaults(defineProps<Props>(), {
    credits: true
})
</script>

<template>
    <seo-kit />
    <Header />
    <slot />
    <client-only>
        <Footer />
        <captcha v-if="globalCaptcha" global /> 
        <dev-credit v-if="credits" />
    </client-only>
</template>