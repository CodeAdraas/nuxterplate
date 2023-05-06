import { LazyLoadAbstraction } from './core'

var instance: LazyLoadAbstraction

export const useLazyLoad = () => {
    if (!instance) {
        instance = LazyLoadAbstraction.withCallback()
    }
    return instance
}