
import { createClient } from 'redis';
import Redis from 'ioredis';

export default class RedisClient {
    private data: any;

    constructor(data: any) {
        this.data = data;
    }

    connect = async () => {
        const endPoint = process.env.REDIS_ENDPOINT;
        if (!endPoint) {
            this.data.utils.error("Could not connect to Redis. ");
            process.exit(1);
        }
        this.data.redis = new Redis(endPoint);
        this.data.redis.on("error", (err: any) => this.onError(err));
        this.data.redis.on('connect', () => this.onConnection());
    }
    onConnection = () => {
        this.data.utils.print('Redis Client Connected', 'Redis');
    }

    onError = (err: any) => {
        this.data.utils.print('Redis Client Error', 'Redis');
        // console.error(err);
        // process.exit(1);
    }
}
