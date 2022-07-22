const change = (chat, _message) => chat
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