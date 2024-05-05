import BootLoader from "./Loader";
import { config as dotenvConfig } from 'dotenv'
import MongoDB from './Database/MongoDB';
import RedisClient from "./Database/Redis";
import TestClient from "./Test/TestClient";
import ModelManager from "./Database/ModelManager";
import { ResponseType } from "./Instances/enums/ResponseType";

export default class Manager {
	private data: any = { project_name: "Tawreed" };
	private loader: BootLoader = new BootLoader(this.data);
	private mongodb: MongoDB = new MongoDB(this.data);
	private redis: RedisClient = new RedisClient(this.data);
	private testClient: TestClient = new TestClient(this.data);
	private modelManager: ModelManager = new ModelManager();
	constructor() {
		dotenvConfig();
	}
	async init() {
		this.loader.load_utils();
		this.loader.load_departments();
		this.loader.load_Server();
		await this.startRedis();
		await this.startDatabase();
		await this.modelManager.populateModels();
		await this.testClient.run();
	}
	startDatabase = async () => await this.mongodb.connect();
	startRedis = async () => await this.redis.connect();
}

(async () => {
	// STARTER;
	const starter = new Manager();
	starter.init();
})();
