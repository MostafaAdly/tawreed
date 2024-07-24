import { Request } from "express";
import IBaseDTO from "src/controllers/base/base.dto";

export default class NewOfferDTO implements IBaseDTO {
  offerId = 0;
  status = 'string';

  __onCheck__: (req: Request) => void;
}