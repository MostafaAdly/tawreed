import { parsePhoneNumber } from "libphonenumber-js";
import Client from "../models/client.model";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import companySizeConfig from "src/config/core/company-size.config";
import { faker } from "@faker-js/faker/locale/ar";
import categoriesConfig from "src/config/core/categories.config";
import Supplier from "../models/supplier.model";
import Admin from "../models/admin.model";

export default class DefaultSeeder implements EntitySeeder {
  init: () => {

  };
  checkIfTableIsEmpty: () => Promise<boolean>;
  deleteAdmin = async () => {
    const defaultAdmin = await Admin.findOne({ where: { email: this.defaultAdminData.email } });
    if (defaultAdmin)
      await defaultAdmin.remove();
  }
  seedAdmin = async () => {
    await this.deleteAdmin();
    const defaultAdmin = await Admin.create({
      email: this.defaultAdminData.email,
      ...(await this.defaultAdminData.method())
    });
    await defaultAdmin.save();

  }
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

    const defaultSupplier = await Supplier.findOne({ where: { email: this.defaultSupplierData.email } });
    if (defaultSupplier)
      await defaultSupplier.remove();
  };

  defaultClientData = {
    email: "client@gmail.com".toLowerCase(),
    method: async () => {
      return {
        username: "amera_ceramic",
        companyName: "الاميرة للسراميك",
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
        }
      }
    }
  }

  defaultSupplierData = {
    email: "supplier@gmail.com".toLowerCase(),
    method: async () => {
      return {
        username: "شركة الرخام",
        companyName: "ro5am_company",
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        industry: categoriesConfig[Helpers.random(categoriesConfig.length)].name,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
        }
      }
    }
  }
  defaultAdminData = {
    email: "admin@gmail.com".toLowerCase(),
    method: async () => {
      return {
        username: "Super Admin",
        companyName: "Tawreed",
        hashed_password: await Helpers.hash("123123"),
        phone: parsePhoneNumber(`01${Helpers.fakePhoneNumber()}`, 'EG').number,
        company: {
          size: companySizeConfig[Helpers.random(companySizeConfig.length)].name,
          address: faker.location.streetAddress(),
          notes: faker.lorem.sentence(),
        }
      }
    }
  }
}