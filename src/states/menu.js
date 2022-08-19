import Invoice from '../models/Invoice'
import { invoiceResponder } from './invoice'
import { getMenuOpts } from '../opts'

export const menuResponder = (bot, chat) => {
  const message = 'Hi there!'
  const opts = getMenuOpts()
  bot.sendMessage(chat.id, message, opts)
}

export default (chat, message) => {
  if (message.text === 'New invoice') {
    chat.state = 'invoice'
    chat.currentQuestion = 0
    chat.invoice = new Invoice()
    chat.respond(invoiceResponder)

    return chat
  }

  chat.respond(menuResponder)
  return chat
}
