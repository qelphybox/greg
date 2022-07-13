import axios from 'axios'
import { getRandomFileName } from '../utils/utils.js'

const sendInvoiceDocument = async (botInformation, apiUrl, InvoiceData) => {
  const { bot, chatId } = botInformation
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

export default sendInvoiceDocument
