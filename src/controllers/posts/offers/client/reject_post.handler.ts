import { Request, Response } from 'express';
import InfraResponse from '../../../base/response';
import OffersController from '../offers.controller';
import OffersService from 'src/services/offers.service';
import { OfferStatus } from 'src/config/enums/offer_status.enum';
import Helpers from 'src/utils/helpers';

export default class OfferRejectHandler extends OffersController {
  reject = {
    'GET': async (req: Request, res: Response) => {
      const { offerId } = req.query;
      if (Helpers.toInt(offerId as string, -1) === -1)
        return InfraResponse.send(res, {
          message: 'Offer ID is required',
          statusCode: 400,
        });
      const offer = await OffersService.getOfferById({ id: parseInt(offerId as string), status: OfferStatus.Pending });
      if (!offer)
        return InfraResponse.send(res, {
          message: 'Offer not found',
          statusCode: 404,
        });
      offer.status = OfferStatus.Rejected;
      await offer.save();
      return InfraResponse.send(res, {
        message: 'Offer rejected successfully',
        statusCode: 201,
        data: offer
      });
    }
  }
}