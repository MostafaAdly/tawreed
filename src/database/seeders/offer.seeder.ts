import Logger from "src/utils/logger";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import { faker } from "@faker-js/faker/locale/ar";
import Offer from "../models/offer.model";

export default class OfferSeeder implements EntitySeeder {
  init = async () => {
    const isTableEmpty = await this.checkIfTableIsEmpty();
    Logger.log(`- offer table state of empty: ${isTableEmpty}`)
    if (isTableEmpty) {
      this.startSeeding();
    }
  }

  checkIfTableIsEmpty = async (): Promise<boolean> => {
    return (await Offer.find({})).length == 0;
  }

  startSeeding = async () => {
    const count = Helpers.random(250);
    Logger.log(`- Seeding offer table with ${count} records`);
    const list: unknown[] = [];
    for (var i = 0; i < count; i++)
      list.push({
        status: faker.lorem.word(),
        name: faker.lorem.word(),
        description: faker.lorem.sentence(),
        industry: faker.lorem.word(),
        quantity: Helpers.random(100),
        images: [faker.image.url()],
        metadata: {
          key: faker.lorem.word()
        }
      });
    list.forEach((data) => this.seed(data));
  }

  seed = async (data: unknown) => {
    const model = new Offer();
    Object.assign(model, data);
    await model.save();
  }


  deleteAll = async () => {
    await Offer.delete({})
  }
}