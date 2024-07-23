import { Request } from "express";
import IBaseDTO from "src/controllers/base/base.dto";

export default class NewUserClientDTO implements IBaseDTO {
  username = 'string';
  companyName = 'string';
  email = 'string';
  password = 'string';
  companySize = 'string';
  companyAddress = 'string';
  notes = 'string';
  phone = 'string';

  __onCheck__ = (req: Request) => {
    if (!req['files']) return;
    const images = req['files'].map(file => file.path);
    if (typeof req.body['images'] !== 'object')
      req.body['images'] = images;
    else req.body['images'].push(...images);
  }
}