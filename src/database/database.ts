import Logger from "../utils/logger";
import { AppDataSource } from "./orm.config";
import BaseSeeder from "./seeders/base.seeder";

export default class Database {
    private driver: string = "postgres";

    connect = async (): Promise<boolean> => {
        try {
            await AppDataSource.initialize()
            Logger.log(`Connected to ${this.driver} database`);
            this.onConnect();
            return true;
        } catch (error) {
            this.onError(error);
            return false;
        }
    }

    runMigrations = async () => {
        Logger.log("Running database migrations");
        await AppDataSource.runMigrations();
        Logger.log("Database migrations complete");
    }

    disconnect = () => {
        Logger.log(`Disconnected from ${this.driver} database`);
    }

    onConnect = () => {
        new BaseSeeder().init();
    }

    onError = (error: Error) => {
        Logger.error(`Error connecting to ${this.driver} database: ${error.message}`);
    }
}