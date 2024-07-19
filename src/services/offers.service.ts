import Offer from "src/database/models/offer.model";
import BaseService from "./base.service";
import Helpers from "src/utils/helpers";
import Post from "src/database/models/post.model";

export default class OffersService extends BaseService {

  static getOffers = async ({ id, clientId, supplierId, name, industry, selectClient }:
    { id?: number | string, clientId?: string, supplierId?: string, name?: string, industry?: string, selectClient?: boolean }) => {
    const where = [
      { id: Helpers.toInt(id as string, null) },
      { client: { id: clientId } },
      { supplier: { id: supplierId } },
      { name },
      { industry }
    ];
    const relations = selectClient ? ['client'] : [];
    const offers = await Post.find({ where, relations })
    if (selectClient)
      offers.forEach(offer => {
        delete offer.client?.hashed_password
      })
    return offers;
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