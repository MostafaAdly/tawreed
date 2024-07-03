export default class Manager {
    private connected;
    private runMigrations;
    private regularStartup;
    private database;
    init: () => Promise<void>;
    validateCommandArguments: () => void;
    initServer: () => void;
    initDatabase: () => Promise<void>;
    runDatabaseMigrations: () => Promise<void>;
}
