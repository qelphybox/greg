const changeMenu = (chat, _message) => chat;

const changeMapping = {
    menu: changeMenu
}

const respondMenu = (chat, bot) => {
    const opts = {
        reply_markup: {
          one_time_keyboard: true,
          keyboard: [['New invoice']],
        },
      }
      const message = 'Hi there!'
    bot.sendMessage(chat.telegramChatId, message, opts)
}

const respondMapping = {
    menu: respondMenu
}

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