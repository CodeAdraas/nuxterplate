import { computed } from 'vue'
import { useDebounce } from './performance'

var isListeningForResize = false

/**
 * Reads the current window breakpoint
 */
const resizeListener = useDebounce((evt: any) => {
    ww.value = window.innerWidth
    let bp = getBreakpoint() as Breakpoint
    currentBreakpoint.value = bp
}, 50)

export const useBreakpoint = () => {
    // @ts-ignore
    if (process.client && !isListeningForResize) {
        window.addEventListener('resize', resizeListener)
        isListeningForResize = true
    }

    return {
        current: currentBreakpoint,
        is: (assertion: Breakpoint) => computed(() => is(assertion)),
        between: (...args: RangeArgs) => computed(() => between(...args))
    }
}