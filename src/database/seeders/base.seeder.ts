import Logger from "src/utils/logger";
import EntitySeeder from "./entity.seeder";
import Helpers from "src/utils/helpers";
import Validators from "src/utils/validators";
// import UserSeeder from "./users.seeder";

export default class BaseSeeder {

    seeders: EntitySeeder[] = [
        // new UserSeeder(),
    ];

    init = () => {
        Logger.log("Seeding database.");
        if (!Helpers.isEnvProduction() && Validators.validateCommandArgument("erase", true)) {
            this.erase();
        }
        this.seed();
    }

    seed = () => {
        this.seeders.forEach(async (seeder) => seeder.init());
    }

    erase = () => {
        Logger.warn("Erasing database.")
        this.seeders.forEach(async (seeder) => seeder.deleteAll());
    }
}