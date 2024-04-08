export default class Manager {
    private data;
    private loader;
    private mongodb;
    constructor();
    init(): Promise<void>;
    startDatabase: () => Promise<void>;
}
