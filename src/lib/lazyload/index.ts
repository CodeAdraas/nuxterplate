import LazyLoad from 'vanilla-lazyload'

type GenericCallback = (...args: any[]) => void

interface Listener {
    el: Element
    callback: GenericCallback
}

const isClient = typeof window !== 'undefined'

class MockLazyload {
    update() {}
    destroy() {}
}

export class Lazy {
    lazyload: any
    listeners: Listener[]

    constructor() {
        this.lazyload = null
        this.listeners = []
    }

    set(lazyload: any) {
        this.lazyload = lazyload
    }

    update() {
        this.lazyload.update()
    }

    loaded(el: Element, callback: GenericCallback) {
        this.listeners.push({el, callback})
    }

    static withCallback() {
        let instance = new this()
        let options: Record<string, any> = {}
        options.unobserve_entered = true
        options.callback_enter = instance.callbackEnter.bind(instance)
        instance.set(isClient ? new LazyLoad(options) : new MockLazyload())
        return instance
    }

    private callbackEnter(loadedEl: Element) {
        for (let {el, callback} of this.listeners) {
            if(el === loadedEl) {
                callback()
                this.removeListener(el)
                break;
            }
        }
    }

    private removeListener(loadedEl: Element) {
        this.listeners = this.listeners.filter(({el}) => el !== loadedEl)
    }
}