import { FormDrop } from '../lib/formdrop'


export const useFormDrop = (baseUrl: string) => {
    return new FormDrop(baseUrl)
}