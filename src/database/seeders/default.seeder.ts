import { parsePhoneNumber } from "libphonenumber-js";
import Client from "../models/client.model";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import companySizeConfig from "src/config/core/company-size.config";
import { faker } from "@faker-js/faker/locale/ar";
import categoriesConfig from "src/config/core/categories.config";
import Supplier from "../models/supplier.model";

export default class DefaultSeeder implements EntitySeeder {
  init: () => {

  };
  checkIfTableIsEmpty: () => Promise<boolean>;
  startSeeding = async () => {
    const defaultClient = await Client.create({
      email: this.defaultClientData.email,
      ...(await this.defaultClientData.method())
    });
    await defaultClient.save();

    const defaultSupplier = await Supplier.create({
      email: this.defaultSupplierData.email,
      ...(await this.defaultSupplierData.method())
    });
    await defaultSupplier.save();
  };
  seed = async (data: unknown, owner: any) => {
  };
  deleteAll = async () => {
    const defaultClient = await Client.findOne({ where: { email: this.defaultClientData.email } });
    if (defaultClient)
      await defaultClient.remove();

    const defaultSupplier = await Client.findOne({ where: { email: this.defaultSupplierData.email } });
    if (defaultClient)
      await defaultSupplier.remove();

  };

  defaultClientData = {
    email: "client@gmail.com".toLowerCase(),
    method: async () => {
      return {
        username: "الاميرة للسراميك",
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
          industry: categoriesConfig[Helpers.random(categoriesConfig.length)].name,
        }
      }
    }
  }

  defaultSupplierData = {
    email: "supplier@gmail.com".toLowerCase(),
    method: async () => {
      return {
        username: "شركة الرخام",
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
          industry: categoriesConfig[Helpers.random(categoriesConfig.length)].name,
        }
      }
    }
  }
}