export default class Database {
    private driver;
    connect: () => Promise<boolean>;
    runMigrations: () => Promise<void>;
    createConnection: () => Promise<void>;
    disconnect: () => void;
    onError: (error: Error) => void;
}
