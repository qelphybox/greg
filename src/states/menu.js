import cloneDeep from 'lodash.clonedeep'
import Invoice from '../Invoice'

const change = (oldState, message) => {
  if (message.text === 'New invoice') {
    const newState = cloneDeep(oldState)
    newState.state = 'invoice'
    newState.currentQuestion = 0
    newState.invoice = new Invoice()
    return newState
  }

  return oldState
}

const respond = (chat, bot) => {
  const opts = {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: [['New invoice']],
    },
  }
  const message = 'Hi there!'
  bot.sendMessage(chat.telegramChatId, message, opts)
}

export default { change, respond }