import Logger from "src/utils/logger";
import EntitySeeder from "./entity.seeder";
import UserSeeder from "./users.seeder";
import Helpers from "src/utils/helpers";
import Validators from "src/utils/validators";

export default class BaseSeeder {

    seeders: EntitySeeder[] = [
        new UserSeeder(),
    ];

    init = () => {
        Logger.log("Seeding database.");
        if (!Helpers.isEnvProduction() && Validators.validateCommandArgument("erase", true)) {
            this.erase();
        }
        this.seed();
    }

    seed = () => {
        this.seeders.forEach(async (seeder) => await seeder.init());
    }

    erase = () => {
        this.seeders.forEach(async (seeder) => await seeder.deleteAll());
    }
}