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
            stream.pipeline(
                fs.createReadStream(path.join(__dirname, `../../../../LocalDatabase/images/${id}`)),
                ps,
                (err) => {
                    if (err)
                        return res.sendStatus(400);
                })
            ps.pipe(res);
        })
    }
}