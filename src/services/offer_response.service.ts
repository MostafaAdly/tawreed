import OfferResponse from "src/database/models/offer_response.model";
import BaseService from "./base.service";
import OffersService from "./offers.service";
import { OfferStatus } from "src/config/enums/offer_status.enum";

export default class OfferResponseService extends BaseService {
  static getOfferResponseById = async ({ id, relations = [] }) => {
    return await OfferResponse.findOne({ where: { id }, relations });
  }

  static createResponse = async ({ offerId, data }: { offerId: number, data: object }) => {
    const offer = await OffersService.getOfferById({ id: offerId, status: OfferStatus.New });
    if (!offer) return null;
    const response = new OfferResponse();
    Object.assign(response, data);
    Object.assign(response, offer);
    offer.offerResponse = response;
    await offer.save();
    return await response.save();
  }
}