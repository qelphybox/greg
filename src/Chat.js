import Invoice, { questions } from "./Invoice"

const qlen = questions.length;

export default class {
  constructor(telegramChatId) {
    this.telegramChatId = telegramChatId
    this.state = 'menu'
    this.currentQuestion = null
    this.invoice = new Invoice()
  }

  isLastQuestion() {
    return this.currentQuestion + 1 >= qlen;
  }
}