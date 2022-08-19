import Invoice, { questions } from '../models/Invoice'
import { menuResponder } from './menu'
import { getInvoiceOpts } from '../opts'
import send from '../api'

export const SKIP = 'Skip'
export const BACK_TO_MENU = 'Back to the menu'

export const invoiceResponder = (bot, chat) => {
  const [_key, question, requirement] = questions[chat.currentQuestion]
  const opts = getInvoiceOpts(requirement)

  bot.sendMessage(chat.id, question, opts)
}

export const documentResponder = (bot, chat) => {
  const params = chat.invoice.toParams()
  send(bot, chat.id, params)
}

const prosessAnswer = (chat, { key, answer }) => {
  if (answer === SKIP) {
    chat.invoice[key] = null
    return chat
  }
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
    chat.respond(menuResponder)
    chat.state = 'menu'

    return chat
  }

  if (answer === SKIP) {
    chat.currentQuestion += 1
    chat.respond(invoiceResponder)
    return chat
  }

  if (answer === BACK_TO_MENU) {
    chat.state = 'menu'
    chat.respond(menuResponder)
    return chat
  }

  chat.respond(invoiceResponder)
  chat.currentQuestion += 1
  return chat
}
