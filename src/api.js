import axios from 'axios'
export default async (bot, chatId, InvoiceData) => {
  try {
    const fileOptions = {
      filename: 'Invoice.pdf',
      contentType: 'application/pdf',
    }

    const options = {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'stream',
    }

    const response = await axios.post(
      'https://invoice-generator.com',
      InvoiceData,
      options
    )

    bot.sendDocument(chatId, response.data, {}, fileOptions)
  } catch (err) {
    console.error(err)
    throw err
  }
}
