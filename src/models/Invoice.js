import Item from './Item'
// question = keyword[0] question[1] requirement[2]
export const questions = [
  ['from', 'Enter the name of your company', 'required'],
  ['to', "Enter the name of your Client's company", 'required'],
  ['date', 'Enter the date of your invoice\nExample: Jan 29, 2020', 'required'],
  ['due_date', 'Enter the due date of your invoice', 'optional'],
  ['logo', 'Enter the url of your logo', 'optional'],
  ['number', 'Enter the number of your invoice', 'optional'],
  [
    'currency',
    'Enter the currency of your invoice\nExample: USD / EUR',
    'optional',
  ],
  [
    'items',
    'Enter the description of the item\nFormat: <item name>, <quantity>, unit_cost',
    'required',
  ],
  ['notes', 'Enter your notes', 'optional'],
  ['terms', 'Enter the terms and conditions', 'optional'],
]

const dateValidator = (value) => {
  if (Date.parse(value)) {
  }
  return 'Can not parse this date'
}

export default class {
  static validate(questionKey, value) {
    const question = questions[questionKey][0]

    switch (question) {
      case 'date':
      case 'due_date':
        return dateValidator(value)
    }
  }

  constructor() {
    this.from = null
    this.to = null
    this.logo = null
    this.date = null
    this.due_date = null
    this.notes = null
    this.terms = null
    this.number = null
    this.currency = null
    this.items = []
  }

  addItem(description, quantity, unit_cost) {
    const item = new Item(description, quantity, unit_cost)
    this.items = [...this.items, item]
  }

  toParams() {
    return {
      from: this.from,
      to: this.to,
      logo: this.logo,
      date: this.date,
      due_date: this.due_date,
      notes: this.notes,
      terms: this.terms,
      number: this.number,
      currency: this.currency,
      items: this.items,
    }
  }
}
