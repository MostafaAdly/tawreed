import { Request, Response } from 'express';
import InfraResponse from '../../../base/response';
import OffersController from '../offers.controller';
import OffersService from 'src/services/offers.service';

export default class OfferCreateHandler extends OffersController {
  create = {
    'POST': async (req: Request, res: Response) => {
      const offer = await OffersService.createOffer(req.body);
      return InfraResponse.send(res, {
        data: offer,
        message: 'Offer created successfully',
        statusCode: 201
      });
    }
  }
}