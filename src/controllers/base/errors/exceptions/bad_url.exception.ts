export default class BadURLException extends Error {
  constructor(message: string) {
    super(message);
  }
}