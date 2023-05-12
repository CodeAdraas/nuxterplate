import { ref, computed, type Ref} from 'vue'
import { useDebounce } from './debounce'

/**
 * Allowed breakpoint prefixes
 */
export type Breakpoint =
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | '2xl'

/**
 * Arguments needed for creating a getter for a range of breakpoints
 */
export type RangeArgs = [Breakpoint | null, Breakpoint | null]

/**
 * Breakpoint prefixes and their minimum widths
 */
const BreakpointWidths: Record<Breakpoint, number> = {
    'xs': 0,
    'sm': 640,
    'md': 768,
    'lg': 1024,
    'xl': 1280,
    '2xl': 1536,
}

let isListeningForResize = false

/**
 * Reads the current breakpoint from the document's body psuedo CSS value
 */
// @ts-ignore
export const getBreakpoint = () => !process.client
    ? 'xs'
    : window.getComputedStyle(document.body, '::before').content.replace(/\"/g, '')

// @ts-ignore
const ww = ref(!process.client
    ? 0
    : window.innerWidth)

export const currentBreakpoint = ref(getBreakpoint()) as Ref<Breakpoint>

/**
 * Checks wheter the current window is past given breakpoint but not exceeding the next one
 */
export const is = (assertion: Breakpoint) => {
    if (!process.client) return false
    return assertion === currentBreakpoint.value
}

/**
 * Checks wheter the current window width ranges between to given breakpoints.
 */
export const between = (
    assertion: Breakpoint | null,
    assertion2: Breakpoint | null
) => {
    if (!process.client) return false

    let min = assertion ? BreakpointWidths[assertion]: 0,
        max = assertion2 ? BreakpointWidths[assertion2] : Infinity

    return ww.value >= min && ww.value < max
}

/**
 * Reads the current window breakpoint
 */
const resizeListener = useDebounce((evt: any) => {
    ww.value = window.innerWidth
    let bp = getBreakpoint() as Breakpoint
    currentBreakpoint.value = bp
}, 50)

export const useBreakpoint = () => {
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