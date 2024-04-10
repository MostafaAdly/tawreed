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
            this.pull()
            const version = "fs.readFileSync(path.join(__dirname, '../../../../version.txt'), 'utf8');"
            res.status(200).json({ version });
        });
    }

    private pull() {
        exec('mkdir ____________test', (err, stdout, stderr) => {
            if (err) {
                //some err occurred
                console.error(err)
            } else {
                // the *entire* stdout and stderr (buffered)
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
            }
        });
    }
}