import ErrorController from "./errors.controller";

export default class ErrorCatchHandler extends ErrorController {

  static _index = async (err, req, res, next) => {
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    console.log('ErrorCatchHandler._index');
    return res.json({ message: 'error', error: err.message });
  }

  static catch = {
    'GET': this._index,
    'POST': this._index,
    'PUT': this._index,
    'DELETE': this._index
  }
}