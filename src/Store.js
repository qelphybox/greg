class StorageBuilder {
  constructor() {
    this.storage = {}
  }

  hasUser(chatId) {
    const allUsers = Object.keys(this.storage)
    return allUsers.includes(String(chatId))
  }

  initUser(chatId) {
    this.storage[chatId] = {
      createdAt: Date.now(),
      globalState: 'menu',
      invoiceData: null,
    }
  }

  initNewInvoice(chatId, keywords, questions) {
    this.storage[chatId].invoiceData = {
      invoiceState: 'starting',
      keywords,
      questions,
      answers: [],
      questionCount: 0,
    }
  }

  getGlobalState(chatId) {
    return this.storage[chatId].globalState
  }

  setGlobalState(chatId, state) {
    this.storage[chatId].globalState = state
  }

  getInvoiceQuestion(chatId) {
    const count = this.storage[chatId].invoiceData.questionCount
    return this.storage[chatId].invoiceData.questions[count]
  }

  getInvoiceKeyword(chatId) {
    const count = this.storage[chatId].invoiceData.questionCount
    return this.storage[chatId].invoiceData.keywords[count - 1]
  }

  goToNextQuestion(chatId) {
    this.storage[chatId].invoiceData.questionCount += 1
  }

  setAnswer(chatId, answer) {
    this.storage[chatId].invoiceData.answers.push(answer)
  }

  getInvoiceData(chatId) {
    const questionsAndAnswers = this.storage[chatId].invoiceData.keywords.map(
      (question, i) => [question, this.storage[chatId].invoiceData.answers[i]]
    )
    return Object.fromEntries(questionsAndAnswers)
  }

  isLastAnswer(chatId) {
    return (
      this.storage[chatId].invoiceData.questionCount >=
      this.storage[chatId].invoiceData.questions.length
    )
  }
}

export default StorageBuilder
