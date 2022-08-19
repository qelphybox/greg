import { SKIP, BACK_TO_MENU } from './states/invoice'

export const getInvoiceOpts = (requirement) => {
  switch (requirement) {
    case 'required': {
      return {
        reply_markup: {
          keyboard: [[BACK_TO_MENU]],
        },
      }
    }

    case 'optional': {
      return {
        reply_markup: {
          keyboard: [[SKIP], [BACK_TO_MENU]],
        },
      }
    }

    default: {
      throw new Error(`Invalid requirment: ${requirement}`)
    }
  }
}

export const getMenuOpts = () => {
  return {
    reply_markup: {
      one_time_keyboard: true,
      keyboard: [['New invoice']],
    },
  }
}
