import { reactive } from 'vue'

interface GlobalCaptchaState {
    isVerifying: boolean
    isError: boolean
    responseToken: string | null
}

const state: GlobalCaptchaState = reactive({
    isVerifying: false,
    isError: false,
    responseToken: null,
})

export const useCaptcha = () => {
    return state
}