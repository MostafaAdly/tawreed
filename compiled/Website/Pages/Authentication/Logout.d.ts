import Page from "../Page";
export default class Logout extends Page {
    private data;
    static base_url: string;
    constructor(data: any, base_url?: string);
    run(): void;
}
