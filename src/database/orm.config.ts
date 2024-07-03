import { DataSource } from "typeorm";
import "dotenv/config";
import path from "path";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: process.env.DATABASE_HOST || "localhost",
	port: parseInt(process.env.DATABASE_PORT || "5432"),
	username: process.env.DATABASE_USER || "root",
	password: process.env.DATABASE_PASSWORD || "123123",
	database: process.env.DATABASE_NAME || "app",
	synchronize: false,
	logging: false,//!Helpers.isEnvProduction(),
	entities: [
		path.join(process.cwd(), "src/database/models/*.model.ts")
	],
	subscribers: [],
	migrations: [
		path.join(process.cwd(), "src/database/migrations/*.ts")
	],
})