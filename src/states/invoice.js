import Invoice, { questions } from '../models/Invoice'
import send from '../api'

export const invoiceResponder = (bot, chat) => {
  const question = questions[chat.currentQuestion][1]
  bot.sendMessage(chat.id, question)
}

export const documentResponder = (bot, chat) => {
  const params = chat.invoice.toParams()
  send(bot, chat.id, params)
}

const prosessAnswer = (chat, { key, answer }) => {
  if (key === 'items') {
    const [description, quantity, unit_cost] = answer
      .split(',')
      .map((elem) => elem.trim())

    chat.invoice.addItem(description, Number(quantity), Number(unit_cost))
    return chat
  }

  chat.invoice[key] = answer
  return chat
}

export default (chat, { text }) => {
  const answer = text.trim()
  const key = questions[chat.currentQuestion][0]

  prosessAnswer(chat, { key, answer })

  if (chat.isLastQuestion()) {
    chat.respond(documentResponder)
    chat.state = 'menu'
    return chat
  }

  chat.respond(invoiceResponder)
  chat.currentQuestion += 1
  return chat
}
