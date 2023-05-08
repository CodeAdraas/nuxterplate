import { reactive } from 'vue'

interface TurnstileState {
    useGlobal: boolean
    isVerifying: boolean
    isError: boolean
    responseToken: string | null
}

const state: TurnstileState = reactive({
    useGlobal: false,
    isVerifying: true,
    isError: false,
    responseToken: null,
})

export const useTurnstile = (useGlobal?: boolean) => {
    if (typeof useGlobal !== 'undefined') {
        state.useGlobal = true
    }
    return state
}