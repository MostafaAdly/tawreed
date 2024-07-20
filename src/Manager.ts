import Database from "./database/database";
import Server from "./server";
import Helpers from "./utils/helpers";
import Logger from "./utils/logger";
import minimist from "minimist";

export default class Manager {

    private connected: boolean;
    private runMigrations: boolean;
    private regularStartup: boolean;

    private database: Database = new Database();

    init = async () => {
        this.validateCommandArguments();
        if (Helpers.isEnvProduction()) {
            await this.initDatabase();
            if (!this.connected || !this.regularStartup) {
                return;
            }
            await this.initServer();
        } else {
            this.initServer();
            await this.initDatabase();
            if (!this.connected || !this.regularStartup) {
                return;
            }
        }
    }

    validateCommandArguments = () => {
        const args = minimist(process.argv.slice(2));
        this.runMigrations = args.migrate;
        this.regularStartup = args.start || !args.migrate;
    }

    initServer = async () => {
        Logger.log("Server initialized");
        const server = new Server();
        await server.startServer();
    }

    initDatabase = async () => {
        Logger.log("Database initialized");
        this.connected = await this.database.connect(this.runMigrations);
    }
}