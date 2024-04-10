export default class ModelManager {
    private idSchema;
    private options;
    populateModels: () => Promise<void>;
    private schemaManipulate;
    static loadOne: (className: string, query: any) => Promise<any>;
    static save: (className: string, object: any) => Promise<void>;
    private testDatabase;
}
