export default class GeneralException extends Error {
  constructor(message: string) {
    super(message);
  }
}