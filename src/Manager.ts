import BootLoader from "./Loader";
import { config as dotenvConfig } from 'dotenv'
import MongoDB from './Database/MongoDB';

export default class Manager {
    private data: any = { project_name: "iSupplier" };
    private loader: BootLoader = new BootLoader(this.data);
    private mongodb: MongoDB = new MongoDB(this.data);
    constructor() {
        dotenvConfig();
    }

    async init() {
        this.loader.load_utils();
        this.loader.load_Server();
        await this.startDatabase();
    }
    async startDatabase() {
        await this.mongodb.connect();
    }
}


(async () => {
    // STARTER
    const starter = new Manager();
    starter.init();
})();