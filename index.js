import * as dotenv from 'dotenv'
import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api'
import StorageBuilder from './src/Store.js'
import { getRandomFileName } from './utils/utils.js'
import { KEYWORDS, QUESTIONS } from './utils/values.js'

dotenv.config()
const token = process.env.TG_BOT_TOKEN
const bot = new TelegramBot(token, { polling: true })

const store = new StorageBuilder()

const format = (messageText, keyword) => {
  switch (keyword) {
    case 'from':
    case 'to':
    case 'logo':
    case 'date':
    case 'due_date':
    case 'notes':
    case 'terms': {
      return messageText.toString()
    }

    case 'number': {
      return +messageText
    }

    case 'currency': {
      return messageText.toUpperCase()
    }

    case 'items': {
      const items = messageText.split(',')
      const trimmedItems = items.map((item) => item.trim())
      // "items":[{"name":"Starter plan","quantity":1,"unit_cost":99}]
      return [
        {
          name: trimmedItems[0],
          quantity: trimmedItems[1],
          unit_cost: trimmedItems[2],
        },
      ]
    }

    default: {
      throw new Error(`Unknown keyword: ${keyword}`)
    }
  }
}

const send = (chatId, message, opts = {}) => {
  bot.sendMessage(chatId, message, opts)
}

const sendInvoiceDocument = async (chatId, apiUrl, InvoiceData) => {
  try {
    const fileOptions = {
      filename: getRandomFileName('Invoice', 'pdf'),
      contentType: 'application/pdf',
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'stream',
    }

    const response = await axios.post(apiUrl, InvoiceData, options)

    bot.sendDocument(chatId, response.data, {}, fileOptions)
  } catch (err) {
    console.error(err)
    throw err
  }
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const messageText = msg.text.toString().trim()

  if (!store.hasUser(chatId)) {
    store.initUser(chatId)
  }

  const globalState = store.getGlobalState(chatId)

  switch (globalState) {
    case 'menu': {
      if (messageText === '/start') {
        send(chatId, 'Hi there!', {
          reply_markup: {
            one_time_keyboard: true,
            keyboard: [['New invoice']],
          },
        })
      }

      if (messageText === 'New invoice') {
        store.setGlobalState(chatId, 'newInvoice')

        store.initNewInvoice(chatId, KEYWORDS, QUESTIONS)
        const question = store.getInvoiceQuestion(chatId)
        store.goToNextQuestion(chatId)

        send(chatId, question)
      }

      break
    }

    case 'newInvoice': {
      const currentKeyword = store.getInvoiceKeyword(chatId)
      const formattedAnswer = format(messageText, currentKeyword)
      store.setAnswer(chatId, formattedAnswer)

      if (!store.isLastAnswer(chatId)) {
        const question = store.getInvoiceQuestion(chatId)
        store.goToNextQuestion(chatId)

        send(chatId, question)
      } else {
        send(chatId, '*Preparing your invoice...*', { parse_mode: 'Markdown' })
        const invoiceData = store.getInvoiceData(chatId)
        sendInvoiceDocument(
          chatId,
          'https://invoice-generator.com',
          invoiceData
        )

        store.setGlobalState(chatId, 'menu')
      }

      break
    }
  }
})

bot.on('polling_error', console.log)
