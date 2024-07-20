import { Request, Response } from "express";
import SupplierOffersController from "./supplier_offers.controller";
import OffersService from "src/services/offers.service";
import InfraResponse from "src/controllers/base/response";
import { OfferStatus } from "src/config/enums/offer_status.enum";

export default class SupplierOffersHandler extends SupplierOffersController {

  incoming = {
    'GET': async (req: Request, res: Response) => {
      const offersIDs = (await OffersService.getOffers({ status: OfferStatus.New, select: ['id'] }))?.map(offer => offer.id);
      console.log(offersIDs)
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/incoming',
        data: { offersIDs }
      });
    }
  };

  edit = {
    'GET': async (req: Request, res: Response) => {
      const { offerId } = req.params;
      const offer = (await OffersService.getOffers({ id: offerId, status: OfferStatus.New, selectClient: true }));
      if (!offer) {
        return InfraResponse.render({ req, res, page: '/supplier/posts/incoming' })
      }
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/edit',
        data: { offer }
      });
    }
  };

  inProgress = {
    'GET': async (req: Request, res: Response) => {
      const offersIDs = (await OffersService.getOffers({ select: ['id'] }))?.map(offer => offer.id);
      return InfraResponse.render({
        req,
        res,
        page: 'supplier/posts/in-progress',
        data: { offersIDs }
      });
    }
  }
}