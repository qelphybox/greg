class Invoice {
  constructor(invoiceData) {
    this.questions = invoiceData.map((elem) => elem[0])
    this.messages = invoiceData.map((elem) => elem[1])
    this.lenght = this.questions.reduce((acc) => acc + 1, 0)
    this.answers = []
    this.counter = 0
  }

  isInvoiceMessage(message) {
    if ((this.counter === 0 && message === 'New invoice') || this.counter > 0) {
      return true
    }

    return false
  }

  getState() {
    if (this.counter === 0) {
      return 'start'
    }

    if (this.counter >= this.lenght) {
      return 'finish'
    }

    return 'process'
  }

  nextStep() {
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
    return this.messages[this.counter]
  }

  formatAnswers(answers) {
    const entries = Object.entries(answers)

    const processedAnswers = entries.map(([key, value]) => {
      switch (key) {
        case 'number': {
          return [key, Number(value)]
        }

        case 'items': {
          const result = {}
          const arr = value.split(',')
          arr.map((item, i) => {
            const trimmedItem = item.trim()
            switch (i) {
              case 0:
                result.name = trimmedItem
                break
              case 1:
                result.quantity = Number(trimmedItem)
                break
              case 2:
                result.unit_cost = Number(trimmedItem)
            }
          })

          return [key, [result]]
        }

        case 'currency': {
          return [key, value.toUpperCase()]
        }

        default:
          return [key, value]
      }
    })

    return Object.fromEntries(processedAnswers)
  }

  stopPoll() {
    this.answers = []
    this.counter = 0
  }
}

export default Invoice
