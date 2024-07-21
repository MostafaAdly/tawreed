import { Request, Response } from "express";
import OffersController from "../offers.controller";
import InfraResponse from "src/controllers/base/response";
import OfferResponseService from "src/services/offer_response.service";

export default class OffersSupplierEditPostHandler extends OffersController {
  edit = {
    'PUT': async (req: Request, res: Response) => {
      const { offerId } = req.params;
      if (!offerId)
        return InfraResponse.send(res, {
          statusCode: 401,
          message: "Invalid offer id.",
          error: true
        });
      const offerResponse = await OfferResponseService.createResponse({ offerId: parseInt(offerId), data: req.body });
      if (!offerResponse)
        return InfraResponse.send(res, {
          statusCode: 401,
          message: "Offer not found.",
          error: true
        });
      return InfraResponse.send(res, {
        data: offerResponse,
        statusCode: 200,
        message: "Offer response created successfully."
      });
    }
  }
}