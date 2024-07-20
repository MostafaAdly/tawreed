import Offer from "src/database/models/offer.model";
import BaseService from "./base.service";
import Helpers from "src/utils/helpers";
import { In } from "typeorm";

export default class OffersService extends BaseService {

  static getOfferById = async ({ id, status, relations, select, secured = true }:
    { id: number, status: string, relations?: string[], select?: object, secured?: boolean }) => {
    const offer = await Offer.findOne({ where: { id, status }, relations, select });
    if (secured)
      delete offer.client?.hashed_password;
    return offer;
  }

  static getOffers = async ({ id, clientId, supplierId, name, industry, selectClient, select, status }:
    {
      id?: number | string,
      clientId?: string,
      supplierId?: string,
      name?: string,
      industry?: string,
      selectClient?: boolean,
      select?: object,
      status?: string
    }) => {
    const where = [
      { id: Helpers.toInt(id as string, null) },
      { client: { id: clientId } },
      { supplier: { id: supplierId } },
      { name },
      { industry },
      { status }
    ];
    if (status)
      where.filter(item => !item.status).forEach(item => item.status = status)
    const relations = selectClient ? ['client'] : [];
    const offers = await Offer.find({ where, relations, select })
    if (selectClient)
      offers.forEach(offer => {
        delete offer.client?.hashed_password
      })
    return offers;
  }

  static getOffersByIDs = async ({ offersIDs, select, relations, secured }: { offersIDs: string[], select?: object, relations?: string[], secured?: boolean }) => {
    if (!offersIDs?.length) return [];
    const offers = await Offer.find({ where: { id: In(offersIDs) }, select, relations });
    if (secured && relations.includes('client'))
      offers.map(offer => {
        delete offer.client?.hashed_password;
      });
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