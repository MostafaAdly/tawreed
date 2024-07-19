import { NextFunction, Request, RequestHandler, Response } from "express";
import BaseDTOManager from "src/controllers/base/base.dto.manager";
import InfraResponse from "src/controllers/base/response";

export default class DTOValidatorMiddleware {

  validateBody: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    const dto = BaseDTOManager.DTOs[req.path];
    if (dto) {
      const errors = DTOValidatorMiddleware._validateDto(dto, req);
      if (errors.length === 0) return next();
      return InfraResponse.send(res, {
        statusCode: 400,
        message: `Invalid body: ${errors.join(', ')}`,
      });
    }
    next();
  }

  static _validateDto = (dto: any, req: Request) => {
    const errors = Object.keys(dto)
      .filter(field => !this._isFieldOptional(field))
      .filter(field => !this._isFieldMethod(field))
      .filter(field => typeof dto[field] !== typeof req.body[field])
      .filter(field => !(typeof dto[field] === 'number' && !isNaN(req.body[field])));
    dto.__onCheck__(req);
    return errors;
  }

  static _isFieldOptional = (field: string) => field.endsWith('?');

  static _isFieldMethod = (field: string) => field.startsWith('__') && field.endsWith('__');
}