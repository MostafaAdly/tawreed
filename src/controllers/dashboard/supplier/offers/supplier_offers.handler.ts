import { Request, Response } from "express";
import SupplierOffersController from "./supplier_offers.controller";
import OffersService from "src/services/offers.service";
import InfraResponse from "src/controllers/base/response";
import { OfferStatus } from "src/config/enums/offer_status.enum";
import Helpers from "src/utils/helpers";

export default class SupplierOffersHandler extends SupplierOffersController {

  incoming = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const offersIDs = (await OffersService.getOffers({ status: OfferStatus.New, select: ['id'] }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/incoming',
        data: { offersIDs, user }
      });
    }
  };

  edit = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const { offerId } = req.params;
      if (Helpers.toInt(offerId, -1) == -1)
        return InfraResponse.send(res, {
          statusCode: 401,
          message: "Invalid offer id.",
          error: true
        });
      const id = parseInt(offerId);
      const offer = (await OffersService.getOfferById({ id, status: OfferStatus.New, relations: ['client'] }));
      if (!offer) {
        return InfraResponse.redirect(res, '/supplier/posts/incoming');
      }
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/edit',
        data: { offer, user }
      });
    }
  };

  inProgress = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const offersIDs = (await OffersService.getOffers({
        status: OfferStatus.Pending,
        select: ['id'],
        supplierId: user.id,
        relations: ['offerResponse']
      }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/in-progress',
        data: { offersIDs, user }
      });
    }
  }

  completed = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const offersIDs = (await OffersService.getOffers({
        status: OfferStatus.Confirmed,
        select: ['id'],
        supplierId: user.id,
        relations: ['offerResponse']
      }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/completed',
        data: { offersIDs, user }
      });
    }
  }
}