import { ref, type Ref} from 'vue'

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
export const getBreakpoint = () => process.client
    ? window.getComputedStyle(document.body, '::before').content.replace(/\"/g, '')
    : 'xs'

// @ts-ignore
const ww = ref(process.client
    ? window.innerWidth
    : 0)

export const currentBreakpoint = ref(getBreakpoint()) as Ref<Breakpoint>

/**
 * Checks wheter the current window is past given breakpoint but not exceeding the next one
 */
export const is = (assertion: Breakpoint) => {
    if (process.client) return assertion === currentBreakpoint.value
    return false
}

/**
 * Checks wheter the current window width ranges between to given breakpoints.
 */
export const between = (
    assertion: Breakpoint | null,
    assertion2: Breakpoint | null
) => {
    if (process.client) {
        let min = assertion ? BreakpointWidths[assertion]: 0,
            max = assertion2 ? BreakpointWidths[assertion2] : Infinity

        return ww.value >= min && ww.value < max
    }
    else {
        return false
    }
}