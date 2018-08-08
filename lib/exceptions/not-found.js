export default class NotFoundException {
  constructor(message) {
    this.message = message;
    this.name = 'NotFoundException';
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}
