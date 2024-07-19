import { Request } from "express";
import IBaseDTO from "src/controllers/base/base.dto";

export default class NewOfferDTO implements IBaseDTO {
  name = 'string';
  description = 'string';
  quantity = 'string';
  industry = 'string';
  clientId = 'string';

  __onCheck__ = (req: Request) => {
    const images = req['files'].map(file => file.path);
    if (typeof req.body['images'] !== 'object')
      req.body['images'] = images;
    else req.body['images'].push(...images);
  }
}