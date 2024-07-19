import Offer from "src/database/models/offer.model";
import BaseService from "./base.service";
import Helpers from "src/utils/helpers";

export default class OffersService extends BaseService {

  static getOffers = async ({ id, clientId, supplierId, name, industry }:
    { id?: number | string, clientId?: string, supplierId?: string, name?: string, industry?: string }) => {
    return await Offer.find({
      where: [
        { id: Helpers.toInt(id as string, -1) },
        { client: { id: clientId } },
        {
          supplier: { id: supplierId }
        },
        { name: name },
        { industry }
      ]
    })
  }

  static createOffer = async (user, data) => {
    if (!user) return null;
    const offer = new Offer();
    Object.assign(offer, data);
    offer.client = user;
    await offer.save();
    delete offer.client;
    return offer;
  }


  static getOffersByClientId = async ({ clientId }: { clientId: string }) => {
    return Offer.find({ where: { client: { id: clientId } } })
  }

  static getOffersBySupplierId = async ({ supplierId }: { supplierId: string }) => {
    return Offer.find({ where: { client: { id: supplierId } } })
  }
}