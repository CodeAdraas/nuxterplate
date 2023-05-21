<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useFimbox } from '../../composables/fimbox'
import { useCaptcha } from '../../composables/captcha'
import Form from '../form/component.vue'
import Captcha from '../captcha/component.vue'

interface Props {
    submitLabel: string
    loadingLabel: string
    errorMessage: string
    successMessage: string
    captcha: {
        errorMessage: string
        sitekey?: string
        appearance?: 'always' | 'execute' | 'interaction-only'
        theme?: 'auto' | 'light' | 'dark'
        lang?: 'auto' | 'en' | 'de' | 'nl'
    }
    fimboxUrl?: string
}

const prop = defineProps<Props>()
const runtimeConfig = useRuntimeConfig()
const globalCaptcha = useCaptcha()
const fimbox = useFimbox(prop.fimboxUrl || runtimeConfig.public.fimbox.url)

const captchaToken = ref()
const formValidityMessage = ref()
const isLoading = ref(true)
const isError = ref(false)

const onSubmit = (formData: FormData) => {
    isLoading.value = true
    formValidityMessage.value = undefined

    fimbox.send(
        captchaToken.value,
        Object.fromEntries(formData.entries())
    )
    .then(() => setSuccessMessage(prop.successMessage))
    .catch(err => {
        setErrorMessage(err?.message ? err.message : prop.errorMessage)
    })
    .finally(() => isLoading.value = false)
}

const onTurnstileVerified = (token: string) => {
    captchaToken.value = token
}

const onTurnstileError = () => {
    isLoading.value = false
    setErrorMessage(prop.captcha.errorMessage)
}

const setSuccessMessage = (message: string) => {
    formValidityMessage.value = message
    isError.value = false
}

const setErrorMessage = (message: string) => {
    formValidityMessage.value = message
    isError.value = true
}

const stopWatchCaptchaToken = watch(
    captchaToken,
    (token) => {
        if (token) isLoading.value = false
    }
)

const stopWatchGlobalCaptchaToken = watch(
    () => globalCaptcha.responseToken,
    (token) => {
        if (token) onTurnstileVerified(token)
    }, {
        immediate: true
    }
)

onBeforeUnmount(() => {
    stopWatchCaptchaToken()
    stopWatchGlobalCaptchaToken()
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
            <captcha
                v-if="!globalCaptcha.responseToken &&
                      !globalCaptcha.isVerifying"
                :sitekey="captcha.sitekey"
                :appearance="captcha.appearance"
                :theme="captcha.theme"
                :lang="captcha.lang"
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