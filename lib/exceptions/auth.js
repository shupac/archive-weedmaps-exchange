export default class UnauthenticatedUserException {
  constructor(message = 'User needs to be logged in to perform this action.') {
    this.message = message;
    this.name = 'UnauthenticatedUserException';
  }

  toString() {
    return `${this.name}: ${this.message}`;
  }
}
