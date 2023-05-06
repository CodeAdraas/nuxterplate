export type GenericCallback = (...args: any[]) => void

export const useDebounce = (callback: GenericCallback, wait: number): GenericCallback => {
    if (typeof window === 'undefined') {
        return callback
    }

    let timeoutId = 0
    return (...args: any[]) => {
        window.clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => {
            callback.call(null, ...args)
        }, wait)
    }
}