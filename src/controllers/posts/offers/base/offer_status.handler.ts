import { Request, Response } from "express";
import OffersController from "../offers.controller";
import OffersService from "src/services/offers.service";
import InfraResponse from "src/controllers/base/response";

export default class OfferStatusHandler extends OffersController {
  changeStatus = {
    'POST': async (req: Request, res: Response) => {
      const { offerId, status } = req.body;
      const offer = await OffersService.changeStatus({ offerId, status });
      if (!offer)
        return InfraResponse.send(res, {
          statusCode: 404,
          message: "Offer not found.",
          error: true
        });
      return InfraResponse.send(res, {
        statusCode: 200,
        message: "Offer status changed successfully.",
        data: offer
      });
    }
  }
}