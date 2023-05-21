import { Fimbox as IFimbox } from './types'
import { $fetch } from 'ofetch' 

export class Fimbox implements IFimbox {
    baseUrl

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async send(captchaToken: string, data: Record<string, any>) {
        try {
            await $fetch(`${this.baseUrl.replace(/\/$/, '')}/send`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: {
                    token: captchaToken,
                    data
                },
                retry: 3
            })
        } catch(e: any) {
            if ('undefined' === typeof e.statusCode || e.statusCode !== 401) {
                throw new Error
            }
            throw new Error(e.data.detail)
        }
    }
}