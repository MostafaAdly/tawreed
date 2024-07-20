import { Request, Response } from "express";
import InfraResponse from "src/controllers/base/response";
import OffersController from "../offers.controller";
import OffersService from "src/services/offers.service";

export default class SearchHandler extends OffersController {
  search = {
    'GET': async (req: Request, res: Response) => {
      const offers = await OffersService.getOffers(req.query);
      return InfraResponse.send(res, {
        statusCode: 200,
        message: `Found ${offers.length} offers.`,
        data: offers,
      });
    },
    'POST': async (req: Request, res: Response) => {
      const { offersIDs } = req.body;
      const offers = await OffersService.getOffersByIDs({ offersIDs, relations: ['client'], secured: true });
      return InfraResponse.send(res, {
        statusCode: 200,
        message: `Found ${offers.length} offers.`,
        data: offers,
      });
    }
  }
}