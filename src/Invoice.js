class Invoice {
  constructor(invoiceData) {
    this.questions = invoiceData.map((elem) => elem[0])
    this.messages = invoiceData.map((elem) => elem[1])
    this.opts = invoiceData.map((elem) => elem[2])
    this.answers = []
    this.counter = 0
  }

  isInvoiceMessage(message) {
    if (
      (this.getCounter() === 0 && message === 'New invoice') ||
      this.getCounter() > 0
    ) {
      return true
    }

    return false
  }

  getCounter() {
    return this.counter
  }

  increaseCount() {
    this.counter += 1
  }

  setAnswer(value) {
    this.answers.push(value)
  }

  getData() {
    const questionsAndAnswers = this.questions.map((question, i) => [
      question,
      this.answers[i],
    ])
    return Object.fromEntries(questionsAndAnswers)
  }

  getMessage() {
    const counter = this.getCounter()
    return this.messages[counter]
  }

  formatAnswer(message) {
    const currentIndex = this.questions.indexOf(this.question)
    const currentQuestion = this.questions[currentIndex - 1]

    switch (currentQuestion) {
      case 'number': {
        return Number(message)
      }

      case 'items': {
        const result = {}
        const arr = message.split(',')
        arr.map((item, i) => {
          switch (i) {
            case 0:
              result.name = item
              break
            case 1:
              result.quantity = Number(item)
              break
            case 2:
              result.unit_cost = Number(item)
          }
        })

        return [result]
      }

      case 'currency': {
        return message.toUpperCase()
      }

      default:
        return message
    }
  }

  stopPoll() {
    this.answers = []
    this.counter = 0
  }
}

export default Invoice
