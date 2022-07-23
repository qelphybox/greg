import { questions } from "../Invoice"
import cloneDeep from "lodash.clonedeep"

const format = (text,) => {

}

const change = (chat, { text }) => {
  const newChat = cloneDeep(chat)
  if (newChat.isLastQuestion()) {
      
      
  }
  const field = questions[chat.currentQuestion][0]
  newChat.invoice[field] = format(text)
  newChat.currentQuestion += 1
  return newChat
}

const respond = (chat, bot) => {
  const question = questions[chat.currentQuestion][1];
  const opts = 
  bot.sendMessage(chat.telegramChatId, question, opts)
}

export default { change, respond }