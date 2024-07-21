import { Request } from "express";
import IBaseDTO from "src/controllers/base/base.dto";

export default class NewOfferResponseDTO implements IBaseDTO {
  offerId = 'string';
  supplierId = 'string';
  price = 'string';
  vat = 'string';
  quantity = 'string';
  comment = 'string';
  paymentMethod = 'string';
  paymentTerms = 'string';
  startDate = 'string';
  endDate = 'string';

  __onCheck__ = (req: Request) => {
    const images = req['files'].map(file => file.path);
    if (typeof req.body['images'] !== 'object')
      req.body['images'] = images;
    else req.body['images'].push(...images);
  }
}