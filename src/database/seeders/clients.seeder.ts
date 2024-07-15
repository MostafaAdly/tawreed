import Logger from "src/utils/logger";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import Client from "../models/client.model";
import { faker } from "@faker-js/faker/locale/ar";
import { parsePhoneNumber } from "libphonenumber-js";
import companySizeConfig from "src/config/core/company-size.config";

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
        Logger.log("- Seeding USER@Client table");
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
        const model = new Client();
        Object.assign(model, data);
        await model.save();
    }


    deleteAll = async () => {
        await Client.delete({})
    }
}