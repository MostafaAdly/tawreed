import { Router } from "express";

export default class Page {
    public base_url: string;
    public subdomain: string;
    public router: any = Router();
    constructor(base_url: string);
    constructor(base_url: string, subdomain: string);
    constructor(...args: any[]) {
        if (args.length == 1) {
            this.base_url = args[0];
        } else if (args.length == 2) {
            this.base_url = args[0];
            this.subdomain = args[1];
        }
    }
}