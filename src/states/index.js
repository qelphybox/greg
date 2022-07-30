import menu from './menu'
import invoice from './invoice'
import cloneDeep from 'lodash.clonedeep'

const statesMapping = {
  menu,
  invoice,
}

export const dispatch = (chat, message) => {
  const change = statesMapping[chat.state]
  const dupChat = cloneDeep(chat)
  const changes = change(dupChat, message)
  return changes
}

export const respond = (chat, bot) => {
  chat.responders.forEach(cb => cb(bot, chat))
  chat.responders = []
  return chat
}
