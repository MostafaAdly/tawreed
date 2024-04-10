import Page from "../Page";
export default class VersionControlAPI extends Page {
    static base_url: string;
    constructor(data: any, base_url?: string);
    private run;
    private pull;
}
