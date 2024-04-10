import Page from "../Page";
import path from 'path'
import fs from 'fs';
import { exec } from 'child_process';


export default class VersionControlAPI extends Page {
    public static base_url: string = "/live";
    constructor(data: any, base_url?: string) {
        super(base_url + VersionControlAPI.base_url);
        this.run();
    }

    private run() {
        this.router.get("/", (req: any, res: any) => {
            exec(`git pull ${process.env.GITHUB_REPOSITORY}`, (err, stdout, stderr) => {
                res.status(200).json({ err, stdout, stderr });
            });
        });
    }
}