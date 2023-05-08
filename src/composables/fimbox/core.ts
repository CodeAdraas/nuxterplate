import { Fimbox as IFimbox } from './types'
import { $fetch } from 'ofetch' 

export class Fimbox implements IFimbox {
    baseUrl

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async send(turnstileToken: string, data: Record<string, any>) {
        try {
            await $fetch(`${this.baseUrl.replace(/\/$/, '')}/send`, {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: {
                    token: turnstileToken,
                    data
                },
                retry: 3
            })
        } catch(e: any) {
            if ('undefined' === typeof e.statusCode || e.statusCode !== 401) {
                throw new Error('Er ging iets fout, probeer het later nog eens of neem contact met ons op via e-mail.')
            }
            throw new Error(e.data.detail)
        }
    }
}