import { Fimbox as IFimbox, FimboxSendArgs } from './types'
import { $fetch } from 'ofetch' 

export class Fimbox implements IFimbox {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async send(args: FimboxSendArgs) {
        try {
            await $fetch(`${this.baseUrl.replace(/\/$/, '')}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Captcha-Token': args.captchaToken
                },
                body: {
                    tenantId: args.tenantId,
                    formSubmissionData: args.formData
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