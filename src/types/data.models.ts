import { Messages } from "../config/messages";

interface IQuestion {
    name: string
    type: any,
    message: Messages
    messageOnFailure: Messages
    validate?: (value: string) => Promise<true | Messages>,
    valut?: boolean
}

export { IQuestion };