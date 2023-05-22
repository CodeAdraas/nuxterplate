<script setup lang="ts">
import { useRuntimeConfig } from 'nuxt/app'
import CfTurnstile from './cf-turnstile/component.vue'
import CfTurnstileGlobal from './cf-turnstile/global.vue'

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
    sitekey?: string
    appearance?: Appearance
    theme?: Theme
    lang?: Language
    global?: boolean
    fieldName?: string
}

defineEmits<Emits>()
defineProps<Props>()

const runtimeConfig = useRuntimeConfig()
</script>

<template>
    <!-- Normal Cf Turnstile captcha has optional props -->
    <cf-turnstile
        v-if="!global"
        :sitekey="sitekey || runtimeConfig.public.captcha.sitekey"
        :appearance="appearance"
        :theme="theme"
        :lang="lang"
        :form-field-name="fieldName"
        @verify="token => $emit('verify', token)"
        @expire="$emit('expire')"
        @fail="$emit('fail')"
    />
    <!-- Global Cf Turnstile captcha is a self sustaining compnent and doesn't need any props -->
    <cf-turnstile-global
        v-else
    />
</template>