import Logger from "src/utils/logger";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import Client from "../models/client.model";
import { faker } from "@faker-js/faker/locale/ar";
import { parsePhoneNumber } from "libphonenumber-js";
import companySizeConfig from "src/config/core/company-size.config";
import categoriesConfig from "src/config/core/categories.config";

export default class ClientSeeder implements EntitySeeder {
    init = async () => {
        const isTableEmpty = await this.checkIfTableIsEmpty();
        Logger.log(`- USER@Client table state of empty: ${isTableEmpty}`)
        if (isTableEmpty) {
            this.startSeeding();
        }
    }

    checkIfTableIsEmpty = async (): Promise<boolean> => {
        return (await Client.find({})).length == 0;
    }

    startSeeding = async () => {
        const count = Helpers.random(250);
        Logger.log(`- Seeding USER@Client table with ${count} records`);
        const list: unknown[] = [];
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
        list.forEach((data) => this.seed(data));
    }

    seed = async (data: unknown) => {
        const model = new Client();
        Object.assign(model, data);
        await model.save();
    }


    deleteAll = async () => {
        await Client.delete({})
    }
}