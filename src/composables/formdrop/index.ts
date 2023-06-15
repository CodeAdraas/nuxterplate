import { FormDrop } from './core'


export const useFormDrop = (baseUrl: string) => {
    return new FormDrop(baseUrl)
}