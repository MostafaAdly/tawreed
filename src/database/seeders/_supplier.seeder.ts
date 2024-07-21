import Logger from "src/utils/logger";
import User from "../models/user.model";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import { faker } from "@faker-js/faker/locale/ar";
import { parsePhoneNumber } from "libphonenumber-js";
import companySizeConfig from "src/config/core/company-size.config";
import Supplier from "../models/supplier.model";
import categoriesConfig from "src/config/core/categories.config";

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
    const count = Helpers.random(250);
    Logger.log(`- Seeding USER@Supplier table with ${count} records`);
    const list: unknown[] = [
      {
        email: "supplier@gmail.com".toLowerCase(),
        username: "مصنع الرخام والسراميك",
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
          industry: categoriesConfig[Helpers.random(categoriesConfig.length)].name,
        }
      }
    ];
    for (var i = 0; i < count; i++)
      list.push({
        email: faker.internet.email().toLowerCase(),
        username: faker.internet.userName(),
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
          industry: categoriesConfig[Helpers.random(categoriesConfig.length)].name,
        }
      });
    list.forEach(async (data) => this.seed(data));
  }

  seed = async (data: unknown) => {
    const model = new Supplier();
    Object.assign(model, data);
    model.save();
  }


  deleteAll = async () => {
    await User.delete({})
  }
}