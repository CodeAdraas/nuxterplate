<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useCaptcha } from '../../../composables/captcha'
import CfTurnstile from './component.vue'

const captcha = useCaptcha()
const runtimeConfig = useRuntimeConfig()
const onVerify = (token: string) => {
    captcha.isVerifying = false
    captcha.isError = false
    captcha.responseToken = token
}
const onInvalid = () => {
    captcha.isVerifying = false
    captcha.isError = true
    captcha.responseToken = null
}

onMounted(() => {
    captcha.isVerifying = true
    captcha.isError = false
})
onBeforeUnmount(() => {
    captcha.isVerifying = true
    captcha.isError = false
})
</script>

<template>
    <cf-turnstile
        :sitekey="runtimeConfig.public.captcha.sitekey"
        appearance="interaction-only"
        @verify="onVerify"
        @expire="onInvalid"
        @fail="onInvalid"
    />
</template>