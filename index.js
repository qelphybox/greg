import TelegramBot from 'node-telegram-bot-api'

import Chat from './src/Chat'
import { dispatch, respond } from './src/actions'

const token = process.env.TG_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })
const store = {}

bot.on('message', (message) => {
    const chatId = message.chat.id
    const chatState = store[chatId] = store[chatId] || new Chat(chatId)
    console.log(`[${chatId}] from state`,chatState)
    const newChatState = dispatch(chatState, message)
    console.log(`[${chatId}] to state`,newChatState)
    respond(newChatState, bot)
    store[chatId] = newChatState
})

bot.on('polling_error', console.error)
