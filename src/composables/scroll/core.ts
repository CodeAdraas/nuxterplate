import { Ref } from 'vue'
import Lenis from '@studio-freight/lenis'
import { useRaf } from '../raf'
import { Intersect, type IntersectProgressCb } from './intersect'

type TargetElement = string | HTMLElement | Ref<HTMLElement>

export interface ScrollOptions {
    /**
     * The scroll container used by Lenis
     */
    content?: TargetElement
    /**
     * Wheter to add smooth scroll on touchmove (for touchscreen devices)
     */
    smoothTouch?: boolean
}

export interface OnScrollArgs {
    /**
     * Current amount scrolled, in pixels
     */
    scroll: number
    /**
     * Maximum amount the user can scroll, in pixels
     */
    limit: number
    /**
     * The current speed of scrolling
     */
    velocity: number
    /**
     * Direction in which the user is scrolling, 1 for down -1
     * for up
     */
    direction: 1 | -1
    /**
     * Decimal percentage between 0 and 1 of how much the user has scrolled based
     * on 'scroll' and 'limit'
     */
    progress: number
}

type OnScrollCb = ((args: OnScrollArgs) => void)


export class Scroll {
    /**
     * Options that are used for e.g. Lenis
     */
    options: ScrollOptions
    /**
     * Lenis scroll instance
     */
    lenis: Lenis | null
    /**
     * A list of callbacks that subscribed to the lenis scroll
     * event
     */
    scrollListeners: OnScrollCb[]
    /**
     * 2 Lists of callbacks that listen for scroll direction,
     * up or down
     */
    orientationListeners: {
        down: OnScrollCb[]
        up: OnScrollCb[]
    }
    /**
     * A callback that stops requesting animation frames
     */
    stopRaf: Function | null

    constructor(options?: ScrollOptions) {
        this.options = options || {}
        this.lenis = null
        this.scrollListeners = []
        this.orientationListeners = { down: [], up: [] }
        this.stopRaf = null
    }

    /**
     * Initialise the scroll instance, creating a Lenis instance
     * and assigning it if given, options and starting the scroll
     */
    public init() {
        // If scroll is already initialized
        if (this.lenis !== null) {
            return this.startScroll()
        }

        this.lenis = new Lenis({
            content: this.options?.content
                ? this.getElement(this.options.content)
                : undefined,
            smoothTouch: this.options?.smoothTouch ?? false,
            touchMultiplier: 5
        })

        this.lenis?.on('scroll', this.onScroll.bind(this))
        this.startScroll()
    }

    /**
     * Create a request animation frame callback with the highest
     * priority, and assign notify Lenis when the callback is invoked
     */
    public startScroll() {
        if (!this.stopRaf) {
            this.stopRaf = useRaf((time: number) => {
                this?.lenis?.raf(time)
            }, 0)
        }
    }

    /** Pause scrolling */
    public stop() {
        this?.lenis?.stop()
    }

    /** (Re)start scrolling */
    public start() {
        this?.lenis?.start()
    }

    /**
     * Smooth scroll to given target, target being either a number indicating amount of pixels,
     * a string that identifies a DOM element or a Ref that points to a DOM element
     */
    public scrollTo(target: TargetElement | number) {
        if ('number' !== typeof target) target = this.getElement(target)
        this.lenis?.scrollTo(target)
    }

    /** Listen for normal scroll events */
    public scroll(callback: OnScrollCb) {
        this.scrollListeners.push(callback)
    }

    /** Listen for down oriented scroll events */
    public down(callback: OnScrollCb) {
        this.orientationListeners.down.push(callback)
    }

    /** Listen for up oriented scroll events */
    public up(callback: OnScrollCb) {
        this.orientationListeners.up.push(callback)
    }

    /**
     * Register a scroll intersection for given element
     * Setting the treshold is not recommended
     */
    public intersect(el: TargetElement, treshold = 0) {
        return new Intersect(this.getElement(el), treshold)
    }

    /**
     * Shorthand for creating a scroll intersection for
     * given element and subscribing to in-view progress
     * events
     */
    public progress(
        el: TargetElement,
        callback: IntersectProgressCb,
        offset = 0
    ) {
        let intersection = this.intersect(this.getElement(el))
        intersection.progress(
            (progress: number, bcr: DOMRect) => callback.call(intersection, progress, bcr),
            offset
        )

        return (() => intersection.destroy())
    }

    /**
     * Shorthand for creating a scroll intersection for
     * given element and subscribing to viewport enter
     * events
     */
    public enter(el: TargetElement, callback: Function, treshold = 0) {
        let intersection = this.intersect(this.getElement(el), treshold)
        intersection.enter(() => callback.call(intersection))

        return (() => intersection.destroy())
    }

    /**
     * Shorthand for creating a scroll intersection for
     * given element and subscribing to viewport leave
     * events
     */
    public leave(el: TargetElement, callback: Function, treshold = 0) {
        let intersection = this.intersect(this.getElement(el), treshold)
        intersection.leave(() => callback.call(intersection))

        return (() => intersection.destroy())
    }

    /** Destroy scroll instance */
    public destroy() {
        this.stopRaf?.call(null)
        this.lenis?.destroy()
        this.lenis = null
    }

    /**
     * Callback that is invoked when Lenis is active and the user scrolls.
     * Notifies subscribed (orientation) scroll listeners
     */
    private onScroll(args: OnScrollArgs) {
        const { scroll: y, limit, velocity, direction, progress } = args

        let scrollListeners = [
            ...this.scrollListeners,
            ...this.orientationListeners[direction == -1 ? 'up' : 'down'],
        ]

        // Notify all scroll listeners listeners
        for(let callback of scrollListeners) {
            callback.call(null, {y: scroll, limit, speed: velocity, direction, progress})
        }
    }

    private getElement(el: TargetElement): HTMLElement {
        let element
        if ('object' !== typeof el) {
            element = document.querySelector(el) as HTMLElement
            if(!element) {
                throw Error(`Element '${el}' to intersect could not be found`)
            }
        }
        else if ('value' in el) {
            element = el.value
        }
        else {
            element = el
        }
        return element
    }
}