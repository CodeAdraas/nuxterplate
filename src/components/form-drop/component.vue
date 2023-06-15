<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'
import { useFormDrop } from '../../composables/formdrop'
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
    formDrop: {
        url?: string
        formId?: string
    }
}

const prop = defineProps<Props>()
const runtimeConfig = useRuntimeConfig()
const globalCaptcha = useCaptcha()
const formDrop = useFormDrop(prop.formDrop?.url || runtimeConfig.public.formDrop.url)

const captchaToken = ref()
const validityMessage = ref()
const isLoading = ref(false)
const isCaptchaLoading = ref(true)
const isError = ref(false)
const isGlobalCaptcha = ref(runtimeConfig.public.captcha?.global || false)

const onCaptchaError = () => setErrorMessage(prop.captcha.errorMessage)

const setSuccessMessage = (message: string) => {
    isError.value = false
    validityMessage.value = message
}

const setErrorMessage = (message: string) => {
    isError.value = true
    validityMessage.value = message
}

const onSubmit = (formData: FormData) => {
    isLoading.value = true
    validityMessage.value = undefined

    formDrop.send({
        captchaToken: captchaToken.value,
        formId: runtimeConfig.public.formDrop.formId,
        data: Object.fromEntries(formData.entries())
    })
        .then(() => setSuccessMessage(prop.successMessage))
        .catch(err => setErrorMessage(err?.message ? err.message : prop.errorMessage))
        .finally(() => isLoading.value = false)
}

const stopWatchGlobalCaptchaToken = watch(
    () => globalCaptcha.responseToken,
    (token) => captchaToken.value = token,
    { immediate: true }
)

const stopWatchCaptchaToken = watch(
    captchaToken,
    (token) => {
        isCaptchaLoading.value = token ? false : true
        // Remove captcha error
        if (token && isError.value) {
            isError.value = false
            validityMessage.value = undefined
        }
    },
    { immediate: true }
)

onBeforeUnmount(() => {
    stopWatchGlobalCaptchaToken()
    stopWatchCaptchaToken()
})
</script>

<template>
    <Form
        :submit-label="submitLabel"
        :loading-label="loadingLabel"
        :is-loading="isLoading || isCaptchaLoading"
        :is-error="isError"
        @submit="onSubmit"
    >
        <slot />
        <!--  -->
        <template #captcha>
            <captcha
                v-if="!isGlobalCaptcha"
                :sitekey="captcha.sitekey"
                :appearance="captcha.appearance"
                :theme="captcha.theme"
                :lang="captcha.lang"
                field-name="token"
                v-model="captchaToken"
                @expire="onCaptchaError"
                @fail="onCaptchaError"
            />
        </template>
        <!--  -->
        <template #validityMessage>
            <span v-if="validityMessage">
                {{ validityMessage }}
            </span>
        </template>
    </Form>
</template>