import { Lazy } from '../lib/lazyload'

var instance: Lazy

export const useLazyLoad = () => {
    if (!instance) {
        instance = Lazy.withCallback()
    }
    return instance
}