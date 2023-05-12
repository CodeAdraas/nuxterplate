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
    <!-- SEO -->
    <seo-kit />
    <!-- User interface -->
    <Header />
    <slot />
    <Footer />
    <!-- Invisible global captcha -->
    <captcha v-if="globalCaptcha" global /> 
    <!-- Developer credit -->
    <dev-credit v-if="credits" />
</template>