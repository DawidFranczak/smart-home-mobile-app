export default class CustomError extends Error {
  details: { [key: string]: string[] };
  constructor(message: string, details: { [key: string]: string[] }) {
    super(message);
    this.details = details;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
