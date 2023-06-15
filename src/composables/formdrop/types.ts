export interface FormDrop {
    baseUrl: string
    send(args: FormDropSendArgs): Promise<void>
}

export interface FormDropSendArgs {
    captchaToken: string
    formId: string
    data: Record<string, any>
}