export interface Fimbox {
    baseUrl: string
    send(responseToken: string, data: Record<string, any>): Promise<void>
}