import Invoice from '../models/Invoice'
import { invoiceResponder } from './invoice'

export const menuResponder = (bot, chat) => {
  const opts = {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: [['New invoice']],
    },
  }
  const message = 'Hi there!'
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
