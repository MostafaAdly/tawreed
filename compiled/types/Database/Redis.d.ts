export default class Redis {
    private data;
    constructor(data: any);
    connect: () => Promise<void>;
}
