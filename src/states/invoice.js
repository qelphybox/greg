import Invoice, { questions } from "../models/Invoice"

export const invoiceResponder = (bot, chat) => {
  const question = questions[chat.currentQuestion]
  bot.sendMessage(chat.id, question)
}

export const documentResponder = (bot, chat) => {
  const params = chat.invoice.toParams()
}

export const invalidResponder = (bot, chat) => {

}

const validate = (questionKey, value) => {
  Invoice.validate(questionKey, value)
}

export default (chat, { text }) => {
  const value = text.trim()
  const error = validate(questionKey, value)

  // const error = validate()
  // if (error) {
  //   newChat.errMessage = error
  //   return newChat
  // }


  // if (newChat.isLastQuestion()) {
  //   newChat.getDocument()
  //   newChat.state = 'document'
  // }

  newChat.currentQuestion += 1
  return newChat
}
