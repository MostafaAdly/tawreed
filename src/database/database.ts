import Logger from "../utils/logger";

export default class Database {
    private driver: string = "postgres";

    connect = () => {
        Logger.log(`Connecting to ${this.driver} database`);
    }

    disconnect = () => {
        Logger.log(`Disconnecting from ${this.driver} database`);
    }
}