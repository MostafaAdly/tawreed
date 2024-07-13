import Logger from "src/utils/logger";
import User from "../models/user.model";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";

export default class UserSeeder implements EntitySeeder {
    init = async () => {
        const isTableEmpty = await this.checkIfTableIsEmpty();
        Logger.log(`Users table state of empty: ${isTableEmpty}`)
        if (isTableEmpty) {
            this.startSeeding();
        }
    }

    checkIfTableIsEmpty = async (): Promise<boolean> => {
        return (await User.find({})).length == 0;
    }

    startSeeding = async () => {
        Logger.log("Seeding users table");
        ([
            {
                email: "MostafaAdlyAmar@gmail.com",
                username: "MostafaAdly",
                hashed_password: await Helpers.hash("123123"),
                phone: "01000000000",
            },
        ] as { email: string, hashed_password: string, username: string, phone: string }[])
            .forEach(async (data) => await this.seed(data));
    }

    seed = async (data: { email: string, hashed_password: string, username: string }) => {
        const user = new User();
        Object.assign(user, data);
        await user.save();
    }


    deleteAll = async () => {
        await User.delete({})
    }
}