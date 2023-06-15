import { FormDrop as IFormDrop, FormDropSendArgs } from './types'
import { $fetch } from 'ofetch' 

export class FormDrop implements IFormDrop {
    baseUrl: string

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl
    }

    async send(args: FormDropSendArgs) {
        try {
            await $fetch(`${this.baseUrl.replace(/\/$/, '')}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Captcha-Token': args.captchaToken
                },
                body: {
                    formId: args.formId,
                    formSubmissionData: args.data
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