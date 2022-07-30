import Invoice, { questions } from "./Invoice"

const qlen = questions.length;

export default class {
  constructor(id) {
    this.id = id
    this.state = 'menu'
    this.currentQuestion = null
    this.invoice = new Invoice()
    this.responders = []
  }

  isLastQuestion() {
    return this.currentQuestion + 1 >= qlen;
  }

  renspond(callback) {
    this.responders = [...this.responders, callback]
  }
}