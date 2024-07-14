import Logger from "src/utils/logger";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import Client from "../models/client.model";

export default class ClientSeeder implements EntitySeeder {
    init = async () => {
        const isTableEmpty = await this.checkIfTableIsEmpty();
        Logger.log(`Clients table state of empty: ${isTableEmpty}`)
        if (isTableEmpty) {
            this.startSeeding();
        }
    }

    checkIfTableIsEmpty = async (): Promise<boolean> => {
        return (await Client.find({})).length == 0;
    }

    startSeeding = async () => {
        Logger.log("Seeding User:client table");
        ([
            {
                email: "the-yassmin-tegara@gmail.com",
                username: "شركة الياسمين للتجارة",
                hashed_password: await Helpers.hash("123123"),
                phone: "01235000862",
            },
        ] as { email: string, hashed_password: string, username: string, phone: string }[])
            .forEach(async (data) => await this.seed(data));
    }

    seed = async (data: { email: string, hashed_password: string, username: string }) => {
        const model = new Client();
        Object.assign(model, data);
        await model.save();
    }


    deleteAll = async () => {
        await Client.delete({})
    }
}