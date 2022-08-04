export default class {
  constructor(name, quantity, unit_cost) {
    this.name = name
    this.quantity = quantity
    this.unit_cost = unit_cost
  }

  toParams() {
    return {
      name: this.name,
      quantity: this.quantity,
      unit_cost: this.unit_cost,
    }
  }
}
