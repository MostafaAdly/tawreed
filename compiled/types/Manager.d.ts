export default class Manager {
    private data;
    private loader;
    private mongodb;
    private redis;
    constructor();
    init(): Promise<void>;
    startDatabase: () => Promise<void>;
    startRedis: () => Promise<void>;
}
