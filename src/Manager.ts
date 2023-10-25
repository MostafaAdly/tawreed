import BootLoader from "./Loader";
import { config as dotenvConfig } from 'dotenv'

export default class Manager {
    private data: any = {};
    private loader: BootLoader = new BootLoader(this.data);
    constructor() {
        dotenvConfig();
    }

    init() {
        this.loader.load_utils();
        this.loader.load_Server();
    }
    startDataBase() {
        this.loader.start_database();
    }
}


// STARTER
const starter = new Manager();
starter.init();