export default class Global {
    private utils;
    static id_suffix: string;
    static productId_prefix: string;
    static userId_prefix: string;
    static entityId_prefix: string;
    static entityCategoryId_prefix: string;
    static departmentId_prefix: string;
    static roleId_prefix: string;
    static personaId_prefix: string;
    static commentId_prefix: string;
    static requestId_prefix: string;
    static paymentId_prefix: string;
    constructor(data: any);
    initialize(): void;
    private countSpaces;
    static createId: () => string;
    static createToken: () => string;
}
