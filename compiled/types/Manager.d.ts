export default class Manager {
    private data;
    private loader;
    private mongodb;
    private redis;
    private testClient;
    private modelManager;
    constructor();
    init(): Promise<void>;
    startDatabase: () => Promise<void>;
    startRedis: () => Promise<void>;
}
