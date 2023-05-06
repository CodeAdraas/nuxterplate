import { useRaf } from '../raf'

export type IntersectCb = ((el: HTMLElement) => void)
export type IntersectProgressCb = ((progress: number, bcr: DOMRect) => void)

class Progress {
    top: number
    height: number
    _offset = 0
  
    constructor(top: number, height: number, offset = 0) {
        this.top = top
        this.height = height
        this.offset = offset
    }
  
    set offset(offset) {
        this._offset = 1 - offset
    }
  
    get offset() {
        return this._offset
    }
  
    updateRect(bcr: DOMRect) {
        this.top = bcr.top
        this.height = bcr.height
    }
  
    get amount() {
        let offset = this.offset * window.innerHeight,
            top = (this.top - offset) * -1
    
        return Math.max(Math.min(top / this.height, 1), 0);
    }
}

export class Intersect {
    target: HTMLElement
    observer: IntersectionObserver
    _progress: Progress
    unsubscribeRaf: Function | null
    enterCallback: IntersectCb | null
    leaveCallback: IntersectCb | null
    isTrackingProgress: boolean
    progressCallback: Function | null

    constructor(el: HTMLElement, treshold: number) {
        this.target = el
        this.observer = new IntersectionObserver(
            this.observerCallback.bind(this), {
                root: null,
                threshold: treshold
            }
        )
        this._progress = new Progress(0, 0)
        this.enterCallback = null
        this.leaveCallback = null
        this.progressCallback = null
        this.isTrackingProgress = false
        this.unsubscribeRaf = null

        this.observer.observe(el)
    }

    enter(callback: IntersectCb) {
        this.enterCallback = callback
    }

    leave(callback: IntersectCb) {
        this.leaveCallback = callback
    }

    progress(callback: IntersectProgressCb, offset = 0) {
        this.progressCallback = callback
        this._progress.offset = offset
    }

    destroy() {
        this.unsubscribeRaf?.call(null)
        this.observer.disconnect()
    }

    observerCallback(
        entries: IntersectionObserverEntry[],
        _: IntersectionObserver
    ) {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                this.enterCallback?.call(null, this.target)

                if(this.progressCallback && !this.isTrackingProgress) {
                    this.isTrackingProgress = true

                    const trackProgressRaf = () => {
                        let bcr = this.target.getBoundingClientRect()
                        this._progress.updateRect(bcr)
                        this.progressCallback?.call(null, this._progress.amount, bcr)
                    }

                    // Create request animation frame callback
                    this.unsubscribeRaf = useRaf(trackProgressRaf, 1)
                }
            } else {
                this.leaveCallback?.call(null, this.target)

                // If progress is currently being tracked,
                // stop tracking it for performance
                if(this.progressCallback && this.isTrackingProgress) {
                    // Remove request animation frame callback
                    this.unsubscribeRaf?.call(null)
                    this.isTrackingProgress = false
                }
            }
        })
    }
}