import { Request, Response } from 'express';
import InfraResponse from '../../../base/response';
import OffersController from '../offers.controller';
import OffersService from 'src/services/offers.service';
import UsersService from 'src/services/users.service';

export default class OfferCreateHandler extends OffersController {
  create = {
    'POST': async (req: Request, res: Response) => {
      const user = await UsersService.getUserById(req.body.clientId);
      if (!user)
        return InfraResponse.send(res, {
          message: 'User not found',
          statusCode: 404,
        });
      const offer = await OffersService.createOffer(user, req.body);
      if (!offer)
        return InfraResponse.send(res, {
          message: 'Error creating offer',
          statusCode: 500,
        });
      return InfraResponse.send(res, {
        message: 'Offer created successfully',
        statusCode: 201,
        data: offer
      });
    }
  }
}