import Offer from "src/database/models/offer.model";
import BaseService from "./base.service";
import Helpers from "src/utils/helpers";
import { In } from "typeorm";
import { OfferStatus } from "src/config/enums/offer_status.enum";
import Supplier from "src/database/models/supplier.model";

export default class OffersService extends BaseService {

  static getOfferById = async ({ id, status, relations, select, secured = true }:
    { id: number, status: string, relations?: string[], select?: object, secured?: boolean }) => {
    const offer = await Offer.findOne({ where: { id, status }, relations, select });
    if (offer && secured)
      delete offer.client?.hashed_password;
    return offer;
  }

  static getOffers = async ({ id, clientId, supplierId, name, industry, selectClient, select, status, relations = [] }:
    {
      id?: number | string,
      clientId?: string,
      supplierId?: string,
      name?: string,
      industry?: string,
      selectClient?: boolean,
      select?: object,
      status?: string,
      relations?: string[]
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
    if (clientId)
      where.filter(item => !item.client).forEach(item => item.client = { id: clientId })
    if (supplierId)
      where.filter(item => !item.supplier).forEach(item => item.supplier = { id: supplierId })
    if (!relations) relations = [];
    if (selectClient)
      relations.push('client');
    const offers = await Offer.find({ where, relations, select })
    if (selectClient)
      offers.forEach(offer => {
        delete offer.client?.hashed_password
      })
    return offers;
  }

  static getOffersByIDs = async ({ offersIDs, select, relations, status, secured }:
    { offersIDs: string[], select?: object, relations?: string[], status: string, secured?: boolean }) => {
    // if (!offersIDs?.length) return [];
    const offers = await Offer.find({ where: (offersIDs && { id: In(offersIDs), status }) || { status }, select, relations });
    if (secured && relations?.includes('client'))
      offers.map(offer => {
        delete offer.client?.hashed_password;
      });
    return offers;
  }

  static changeToInProgressById = async ({ id, supplier }: { id: number, supplier: Supplier }) => {
    const offer = await Offer.findOne({ where: { id } });
    return await this.changeToInProgress({ offer, supplier });
  }

  static changeToInProgress = async ({ offer, supplier }: { offer: Offer, supplier: Supplier }) => {
    if (!offer) return null;
    offer.status = OfferStatus.Pending;
    offer.supplier = supplier;
    await offer.save();
    return offer;
  }

  static createOffer = async (user, data) => {
    if (!user) return null;
    const offer = new Offer();
    Object.assign(offer, data);
    offer.status = OfferStatus.New;
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