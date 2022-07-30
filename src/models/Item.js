export default class {
  constructor() {
    this.name = null
    this.quantity = null
    this.unit_cost = null
  }

  toParams() {
    return {
      name: this.name,
      quantity: this.quantity,
      unit_cost: this.unit_cost,
    }
  }
}