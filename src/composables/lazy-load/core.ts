import LazyLoad from 'vanilla-lazyload'

class MockLazyload {
    update() {}
    destroy() {}
}

export class LazyLoadAbstraction {
    lazyload: any
    _listeners: [Element, Function][]

    constructor() {
        this.lazyload = null
        this._listeners = []
    }

    set(lazyload: any) {
        this.lazyload = lazyload
    }

    update() {
        this.lazyload.update()
    }

    loaded(el: Element, callback: Function) {
        this._listeners.push([el, callback])
    }

    _callbackEnter(loadedEl: Element) {
        for (let [el, callback] of this._listeners) {
            if(el === loadedEl) {
                callback()
                this._removeListener(el)
                break;
            }
        }
    }

    _removeListener(loadedEl: Element) {
        this._listeners = this._listeners.filter(([el, cb]) => el !== loadedEl)
    }

    static withCallback() {
        let instance = new this()
        let options: Record<string, any> = {}
        options.unobserve_entered = true
        options.callback_enter = instance._callbackEnter.bind(instance)
        instance.set(process.client ? new LazyLoad(options) : new MockLazyload())
        return instance
    }
}