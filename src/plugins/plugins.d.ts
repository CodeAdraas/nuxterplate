import type { Ref } from 'vue'
import type { Breakpoint, RangeArgs } from '../composables/breakpoint'

interface BreakpointPlugin {
    current: Ref<Breakpoint>,
    is: (assertion: Breakpoint) => boolean,
    between: (...assertions: RangeArgs) => boolean
}

interface BrowserPlugin {
    name: string
    version: number
    versionNumber: string
    os: string
    mobile: boolean
    ios: boolean
    windows: boolean
}

declare module "@vue/runtime-core" {
	export interface ComponentCustomProperties {
		$window: Window;
		$browser: BrowserPlugin;
		$breakpoint: BreakpointPlugin;
	}
}