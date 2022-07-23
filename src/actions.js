import states from './states'

const stateEntries = Object.entries(states)
const changeMapping = stateEntries.reduce((acc, [name, { change }]) => ({ ...acc, [name]: change }), {})
const respondMapping = stateEntries.reduce((acc, [name, { respond }]) => ({ ...acc, [name]: respond }), {})

export const dispatch = (chat, message) => {
  const handler = changeMapping[chat.state]
  const newState = handler(chat, message)
  return newState
}

export const respond = (chat, bot) => {
  const handler = respondMapping[chat.state]
  const newState = handler(chat, bot)
  return newState
}