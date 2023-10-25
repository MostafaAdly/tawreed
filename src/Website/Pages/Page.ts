import { Router } from "express";

export default class Page {
    public base_url: string;
    public router: Router = Router();
    constructor(base_url: string) {
        this.base_url = base_url;
    }
}