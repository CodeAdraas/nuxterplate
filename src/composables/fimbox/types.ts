export interface Fimbox {
    baseUrl: string
    send(args: FimboxSendArgs): Promise<void>
}

export interface FimboxSendArgs {
    captchaToken: string
    tenantId: string
    formData: Record<string, any>
}