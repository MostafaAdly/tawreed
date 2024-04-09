export default class RedisClient {
    private data;
    constructor(data: any);
    connect: () => Promise<void>;
    onError: (err: any) => void;
}
