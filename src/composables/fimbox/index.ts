import { Fimbox } from './core'


export const useFimbox = (baseUrl: string) => {
    return new Fimbox(baseUrl)
}