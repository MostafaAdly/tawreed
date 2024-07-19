import { Request, Response } from "express";
import SupplierOffersController from "./supplier_offers.controller";
import OffersService from "src/services/offers.service";
import InfraResponse from "src/controllers/base/response";

export default class SupplierOffersHandler extends SupplierOffersController {

  incoming = {
    'GET': async (req: Request, res: Response) => {
      const offers = await OffersService.getOffers({});
      return InfraResponse.send(res, {
        statusCode: 200,
        message: `Found ${offers.length} offers.`,
        data: offers,
      });
    }
  }
}