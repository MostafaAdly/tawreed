import Logger from "src/utils/logger";
import EntitySeeder from "./seeder.interface";
import Helpers from "src/utils/helpers";
import Validators from "src/utils/validators";
import fs from 'fs';
import DefaultSeeder from "./default.seeder";

export default class BaseSeeder {

    seeders: EntitySeeder[] = fs
        .readdirSync(__dirname)
        .filter((file) => !['base.seeder.ts', 'seeder.interface.ts', 'default.seeder.ts'].includes(file)) // filters out base and interface files
        .filter((file) => file.endsWith('.ts') && !file.startsWith('_')) // filters out files that start with '_'
        .map((file) => new (require(`./${file}`).default));

    init = async () => {
        Logger.log("Seeding database.");
        if (!Helpers.isEnvProduction() && Validators.validateCommandArgument("erase", 'true')) {
            await this.erase();
        }
        await this.seedDefaultSeeder();
        await this.seed();
    }

    seedDefaultSeeder = async () => {
        await new DefaultSeeder().startSeeding();
    }

    seed = async () => {
        setTimeout(() => {
            this.seeders.forEach(async (seeder) => await seeder.init());
        }, 2000);
    }

    erase = async () => {
        Logger.warn('Erasing database.');
        this.seeders.forEach(async (seeder) => await seeder.deleteAll());
    }
}