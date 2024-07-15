import Logger from "src/utils/logger";
import User from "../models/user.model";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import { faker } from "@faker-js/faker/locale/ar";
import { parsePhoneNumber } from "libphonenumber-js";
import companySizeConfig from "src/config/core/company-size.config";
import Supplier from "../models/supplier.model";

export default class SupplierSeeder implements EntitySeeder {
  init = async () => {
    const isTableEmpty = await this.checkIfTableIsEmpty();
    Logger.log(`- USER@Supplier table state of empty: ${isTableEmpty}`)
    if (isTableEmpty) {
      await this.startSeeding();
    }
  }

  checkIfTableIsEmpty = async (): Promise<boolean> => {
    return (await Supplier.find({})).length == 0;
  }

  startSeeding = async () => {
    Logger.log("- Seeding USER@Supplier table");
    const list: unknown[] = [];
    for (var i = 0; i < Helpers.random(100); i++)
      list.push({
        email: faker.internet.email(),
        username: faker.internet.userName(),
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(faker.phone.number().split(" ")[0], 'EG').number,
        isCompany: true,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence()
        }
      });
    list.forEach(async (data) => await this.seed(data));
  }

  seed = async (data: unknown) => {
    const model = new Supplier();
    Object.assign(model, data);
    await model.save();
  }


  deleteAll = async () => {
    await User.delete({})
  }
}