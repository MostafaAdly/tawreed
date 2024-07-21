import { Request, Response } from "express";
import OffersController from "../offers.controller";
import InfraResponse from "src/controllers/base/response";
import OfferResponseService from "src/services/offer_response.service";
import OffersService from "src/services/offers.service";
import { OfferStatus } from "src/config/enums/offer_status.enum";

export default class OffersSupplierEditPostHandler extends OffersController {
  edit = {
    'PUT': async (req: Request, res: Response) => {
      const supplier = await this.getCurrentUser(req);
      if (!supplier || req.body.supplierId != supplier.id)
        return InfraResponse.send(res, {
          statusCode: 401,
          message: "Unauthorized.",
          error: true
        });
      const offer = await OffersService.getOfferById({ id: parseInt(req.body.offerId), status: OfferStatus.New });
      if (!offer)
        return InfraResponse.send(res, {
          statusCode: 401,
          message: "Invalid offer.",
          error: true
        });
      const offerResponse = await OfferResponseService.createResponse({ offer, supplier, data: req.body });
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