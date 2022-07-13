const store = {
  chatId: {
    state: ['menu', 'building_invoice']
    currentQuestion: '',
    invoice: {
      from: '',
      to: '',
      currency: ''
      // ...
    }
  }
};

test() {
  const oldState = {
    state: ['menu', 'building_invoice']
    currentQuestion: '',
    invoice: {
      from: '',
      to: '',
      currency: ''
      // ...
    }
  }
}

const invoice = () => {}
const init = (chatId) => {};

const stateMapping = {
  menu: invoice,
  building_invoice: invoice
};

bot.on('message', () => {
  const chatData = store[chatId];

  if (!chatData) {
    init(chatId); // state -> menu
    return;
  }

  stateMapping[chatData.state](chatId, chatData)
})


// приходит /start -> отвечаем сообщение + инлайн

// приходит New Invoice -> начинаем опрос
// создаем новый invoice_poll
// задаем вопросы
// валидация?


// invoice_polls
// id:serial
// chat_id:string
// created_at:datetime
// from:string
// to:string
// logo:string
// number:string
// date:date
// due_date:date
// currency:string
// items:jsonb
// notes:text
// terms:text
