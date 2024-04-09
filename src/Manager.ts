import BootLoader from "./Loader";
import { config as dotenvConfig } from 'dotenv'
import MongoDB from './Database/MongoDB';
import RedisClient from "./Database/Redis";

export default class Manager {
	private data: any = { project_name: "Tawreed" };
	private loader: BootLoader = new BootLoader(this.data);
	private mongodb: MongoDB = new MongoDB(this.data);
	private redis: RedisClient = new RedisClient(this.data);
	constructor() {
		dotenvConfig();
	}
	async init() {
		this.loader.load_utils();
		this.loader.load_departments();
		this.loader.load_Server();
		await this.startRedis();
		await this.startDatabase();
	}
	startDatabase = async () => await this.mongodb.connect();
	startRedis = async () => await this.redis.connect();
}


(async () => {
	// STARTER;
	const starter = new Manager();
	starter.init();
})();
