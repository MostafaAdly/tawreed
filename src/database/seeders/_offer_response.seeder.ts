import Logger from "src/utils/logger";
import EntitySeeder from "./seeder.interface";
import OfferResponse from "../models/offer_response.model";

export default class OfferSeeder implements EntitySeeder {
  init = async () => {
    const isTableEmpty = await this.checkIfTableIsEmpty();
    Logger.log(`- offer table state of empty: ${isTableEmpty}`)
    if (isTableEmpty) {
      this.startSeeding();
    }
  }

  checkIfTableIsEmpty = async (): Promise<boolean> => {
    return (await OfferResponse.find({})).length == 0;
  }

  startSeeding = async () => {
    // const count = Helpers.random(250);
    // Logger.log(`- Seeding offer table with ${count} records`);
    // const list: unknown[] = [];
    // list.forEach((data) => this.seed(data));
  }

  seed = async (data: unknown, owner?: any) => {
  }


  deleteAll = async () => {
    await OfferResponse.delete({})
  }
}