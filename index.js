import * as fs from 'fs'
import axios from 'axios'
import * as dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api'
import Invoice from './src/Invoice.js'
import { getRandomFileName } from './utils/utils.js'
import { log } from 'console'

dotenv.config()

const token = process.env.TG_BOT_TOKEN

export const bot = new TelegramBot(token, { polling: true })

const newInvoice = new Invoice([
  ['from', 'Enter the name of your company'],
  ['to', "Enter the name of your Client's company"],
  // ['logo', 'Enter the url of your logo'],
  [
    'date',
    'Enter the date of your invoice\nExample: 2020-01-29 / Jan 29, 2020',
  ],
  // ['due_date', 'Enter the due date of your invoice'],
  // ['number', 'Enter the number of your invoice'],
  [
    'items',
    'Enter the description of the item\nFormat: <item name>, <quantity>, unit_cost',
  ],
  // ['currency', 'Enter the currency of your invoice\nExample: USD / EUR'],
  // ['notes', 'Enter your notes'],
  // ['terms', 'Enter the terms and conditions'],
])

const commands = ['/start']

const getTypeOfMessage = (message) => {
  if (newInvoice.isInvoiceMessage(message)) {
    return 'new invoice'
  }

  if (commands.includes(message)) {
    return 'command'
  }
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const messageText = msg.text.toString().trim()
  const typeOfMessage = getTypeOfMessage(messageText)

  switch (typeOfMessage) {
    case 'command': {
      const opts = {
        reply_markup: {
          keyboard: [['New invoice']],
        },
      }
      const msg =
        'Greg is telegram bot, that allows you to generate invoices easy and fast.\nClick "New invoice" to start!'

      bot.sendMessage(chatId, msg, opts)

      break
    }

    case 'new invoice': {
      const state = newInvoice.getState()
      if (state !== 'start') {
        newInvoice.setAnswer(messageText)
      }

      if (state === 'start' || state === 'process') {
        const message = newInvoice.getMessage()
        bot.sendMessage(chatId, message, {
          reply_markup: { remove_keyboard: true },
        })

        newInvoice.nextStep()
      }

      if (state === 'finish') {
        bot.sendMessage(chatId, '*Preparing your invoice...*', {
          parse_mode: 'Markdown',
        })

        const data = newInvoice.getData()
        const formattedData = newInvoice.formatAnswers(data)
        newInvoice.stopPoll()

        const filename = getRandomFileName('Invoice', 'pdf')

        axios
          .post('https://invoice-generator.com', formattedData, {
            headers: {
              'Content-Type': 'application/json',
            },
            responseType: 'stream',
          })
          .then((response) => {
            response.data
              .pipe(fs.createWriteStream(filename))
              .on('finish', () => {
                const stream = fs.createReadStream(filename)
                bot
                  .sendDocument(chatId, stream)
                  .then(() => {
                    fs.unlink(filename, (err) => {
                      if (err) throw err
                  })
                })
              })
          })
          .catch((err) => {
            console.error(err)
          })
      }

      break
    }

    default: {
      bot.sendMessage(chatId, 'Sorry, I cannot understand your message')
    }
  }
})

bot.on('polling_error', console.log)
