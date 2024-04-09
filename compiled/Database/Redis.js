"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ioredis_1 = __importDefault(require("ioredis"));
class RedisClient {
    constructor(data) {
        this.connect = () => __awaiter(this, void 0, void 0, function* () {
            const endPoint = process.env.REDIS_ENDPOINT;
            if (!endPoint) {
                this.data.utils.error("Could not connect to Redis. ");
                process.exit(1);
            }
            this.data.redis = new ioredis_1.default(endPoint);
            this.data.redis.on("error", (err) => this.onError(err));
        });
        this.onError = (err) => {
            this.data.utils.print('Redis Client Error\n', 'Redis');
            console.error(err);
        };
        this.data = data;
    }
}
exports.default = RedisClient;
