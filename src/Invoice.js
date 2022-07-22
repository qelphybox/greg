import Item from "./Item"

const QUESTIONS = [
    'Enter the name of your company',
    "Enter the name of your Client's company",
    'Enter the url of your logo',
    'Enter the date of your invoice\nExample: 2020-01-29 / Jan 29, 2020',
    'Enter the due date of your invoice',
    'Enter the number of your invoice',
    'Enter the currency of your invoice\nExample: USD / EUR',
    'Enter the description of the item\nFormat: <item name>, <quantity>, unit_cost',
    'Enter your notes',
    'Enter the terms and conditions'
]

export default class {
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

    addItem({ description, quantity, unit_cost }) {
        const item = new Item()
        item.description = description
        item.quantity = quantity
        item.unit_cost = unit_cost
        this.items = [...this.items, item]
    }
}