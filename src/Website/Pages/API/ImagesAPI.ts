import Page from "../Page";
import path from 'path'
import fs from 'fs';
import stream from 'stream'

export default class ImagesAPI extends Page {
    private data: any;
    public static base_url: string = "/images";
    constructor(data: any, base_url?: string) {
        super(base_url || ImagesAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.get("/images/:id", (req: any, res: any) => {
            const id = req.params.id;
            const ps = new stream.PassThrough();
            console.log("Reviewing image", path.join(process.cwd(), `/LocalDatabase/images/${id}`))
            stream.pipeline(
                fs.createReadStream(path.join(process.cwd(), `/LocalDatabase/images/${id}`)),
                ps,
                (err) => {
                    if (err)
                        return res.sendStatus(400);
                })
            ps.pipe(res);
        })
    }
}