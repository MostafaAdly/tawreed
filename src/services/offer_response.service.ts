import OfferResponse from "src/database/models/offer_response.model";
import BaseService from "./base.service";
import Offer from "src/database/models/offer.model";
import Supplier from "src/database/models/supplier.model";

export default class OfferResponseService extends BaseService {
  static getOfferResponseById = async ({ id, relations = [] }) => {
    return await OfferResponse.findOne({ where: { id }, relations });
  }

  static createResponse = async ({ offer, supplier, data }: { offer: Offer, supplier: Supplier, data }) => {
    if (!offer) return null;
    const response = new OfferResponse();
    Object.assign(response, data);
    Object.assign(response, offer);
    response.offer = offer;
    response.supplier = supplier;
    return await response.save();
  }
}