<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRuntimeConfig } from 'nuxt/app';
import { useTurnstile } from '../../composables/turnstile'
import CfTurnstile from '../cf-turnstile/component.vue'

const turnstile = useTurnstile(true)
const runtimeConfig = useRuntimeConfig()
const onVerify = (token: string) => {
    turnstile.isVerifying = false
    turnstile.isError = false
    turnstile.responseToken = token
}
const onInvalid = () => {
    turnstile.isVerifying = false
    turnstile.isError = true
    turnstile.responseToken = null
}

onMounted(() => {
    turnstile.isVerifying = true
    turnstile.isError = false
})
onBeforeUnmount(() => {
    turnstile.isVerifying = true
    turnstile.isError = false
})
</script>

<template>
    <cf-turnstile
        :sitekey="runtimeConfig.public.turnstileSitekey"
        @verify="onVerify"
        @expire="onInvalid"
        @fail="onInvalid"
        appearance="interaction-only"
    />
</template>