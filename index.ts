import "dotenv/config";
import Server from "./src/server";

const server = new Server();
server.startServer();
