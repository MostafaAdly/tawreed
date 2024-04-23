export default class RedisClient {
    private data;
    constructor(data: any);
    connect: () => Promise<void>;
    onConnection: () => void;
    onError: (err: any) => void;
}
