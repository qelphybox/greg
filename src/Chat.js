import Invoice from "./Invoice"

export default class {
    constructor(telegramChatId) {
        this.telegramChatId = telegramChatId
        this.state = 'menu'
        this.currentQuestion = null
        this.invoice = new Invoice()
    }
}