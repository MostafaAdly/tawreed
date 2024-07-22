import { Request, Response } from "express";
import SupplierOffersController from "./client_offers.controller";
import OffersService from "src/services/offers.service";
import InfraResponse from "src/controllers/base/response";
import { OfferStatus } from "src/config/enums/offer_status.enum";

export default class ClientOffersHandler extends SupplierOffersController {

  outgoing = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const offersIDs = (await OffersService.getOffers({ status: OfferStatus.New, clientId: user.id, select: ['id'] }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'client/posts/outgoing',
        data: { offersIDs, user }
      });
    }
  };

  incoming = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const offersIDs = (await OffersService.getOffers({ status: OfferStatus.Pending, clientId: user.id, select: ['id'] }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'client/posts/incoming',
        data: { offersIDs, user }
      });
    }
  };

  confirmed = {
    'GET': async (req: Request, res: Response) => {
      const user = await this.getCurrentUser(req);
      const offersIDs = (await OffersService.getOffers({
        status: OfferStatus.Confirmed,
        select: ['id'],
        clientId: user.id,
        relations: ['offerResponse']
      }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'client/posts/confirmed',
        data: { offersIDs, user }
      });
    }
  }
}