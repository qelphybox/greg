import * as fs from 'fs'
import axios from 'axios'
import * as dotenv from 'dotenv'
import TelegramBot from 'node-telegram-bot-api'
import Invoice from './src/Invoice.js'

dotenv.config()

const token = process.env.TG_BOT_TOKEN

const bot = new TelegramBot(token, { polling: true })

const newInvoice = new Invoice([
  ['from', 'Enter the name of your company'],
  ['to', "Enter the name of your Client's company"],
  // ['logo', 'Enter the url of your logo'],
  // ['date', 'Enter the date of your invoice'],
  // ['due_date', 'Enter the due date of your invoice'],
  // ['number', 'Enter the number of your invoice'],
  // [
  //   'items',
  //   'Enter the description of the item\nFormat: <name>, <quantity>, <unit cost>',
  // ],
  // ['currency', 'Enter the currency of your invoice\nExample: USD / EUR'],
  // ['notes', 'Enter your notes'],
  // ['terms', 'Enter the terms and conditions'],
])

const commands = ['/start']

const getTypeOfMessage = (message) => {
  if (commands.includes(message)) {
    return 'command'
  }

  if (newInvoice.isInvoiceMessage(message)) {
    return 'new invoice'
  }
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id
  const messageText = msg.text.toString().trim()
  const typeOfMessage = getTypeOfMessage(messageText)

  switch (typeOfMessage) {
    case 'command': {
      newInvoice.stopPoll()
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
      if (newInvoice.getCounter() > 0) {
        newInvoice.setAnswer(messageText)
      }

      if (newInvoice.getCounter() > newInvoice.questions.lenght) {
        console.log('i am almost done')
        const data = newInvoice.getData()
        // bot.sendMessage(chatId, 'Preparing your invoice...')
        console.log(data)
      }

      const message = newInvoice.getMessage()
      bot.sendMessage(chatId, message, {
        reply_markup: { remove_keyboard: true },
      })
      newInvoice.increaseCount()

      break
    }

    default: {
      bot.sendMessage(chatId, 'Sorry, I cannot understand your message')
    }
  }
})

bot.on('polling_error', console.log)
