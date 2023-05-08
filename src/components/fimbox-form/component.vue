<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useFimbox } from '../../composables/fimbox'
import { useRuntimeConfig } from 'nuxt/app'
import { useTurnstile } from '../../composables/turnstile'
import Form from '../form/component.vue'
import CfTurnstile from '../cf-turnstile/component.vue'

interface Props {
    submitLabel: string
    loadingLabel: string
    successMessage: string
    turnstileErrorMessage: string
    turnstileSitekey?: string
    turnstileAppearance?: 'always' | 'execute' | 'interaction-only'
    turnstileTheme?: 'auto' | 'light' | 'dark'
    turnstileLang?: 'auto' | 'en' | 'de' | 'nl'
    fimboxApiUrl?: string
}

const prop = defineProps<Props>()

const runtimeConfig = useRuntimeConfig()
const turnstile = useTurnstile()
const fimbox = useFimbox(
    prop.fimboxApiUrl || runtimeConfig.public.fimboxAPIUrl
)

const turnstileToken = ref()
const formValidityMessage = ref()
const isLoading = ref(true)
const isError = ref(false)

const onSubmit = (formData: FormData) => {
    isLoading.value = true
    formValidityMessage.value = undefined

    fimbox.send(turnstileToken.value, Object.fromEntries(formData.entries()))
    .then(() => setSuccessMessage(prop.successMessage))
    .catch(error => setErrorMessage(error))
    .finally(() => isLoading.value = false)
}

const onTurnstileVerified = (token: string) => {
    turnstileToken.value = token
}

const onTurnstileError = () => {
    isLoading.value = false
    setErrorMessage(prop.turnstileErrorMessage)
}

const setSuccessMessage = (message: string) => {
    formValidityMessage.value = message
    isError.value = false
}

const setErrorMessage = (message: string) => {
    formValidityMessage.value = message
    isError.value = true
}

const stopWatchGlobalTurnstile = watch(
    () => turnstile.responseToken,
    (token) => token && onTurnstileVerified(token), {
        immediate: true
    }
)

const stopWatchTurnstile = watch(
    turnstileToken,
    (token) => token && (isLoading.value = false)
)

onBeforeUnmount(() => {
    stopWatchGlobalTurnstile()
    stopWatchTurnstile()
})
</script>

<template>
    <Form
        :submit-label="submitLabel"
        :loading-label="loadingLabel"
        :loading="isLoading"
        :is-error="isError"
        @submit="onSubmit"
    >
        <slot />
        <!--  -->
        <template #captcha>
            <cf-turnstile
                v-if="!turnstile.useGlobal && turnstileSitekey"
                :sitekey="turnstileSitekey"
                :appearance="turnstileAppearance"
                :theme="turnstileTheme"
                :lang="turnstileLang"
                @verify="onTurnstileVerified"
                @expire="onTurnstileError"
                @fail="onTurnstileError"
            />
        </template>
        <!--  -->
        <template #validityMessage>
            <span v-if="formValidityMessage">
                {{ formValidityMessage }}
            </span>
        </template>
    </Form>
</template>