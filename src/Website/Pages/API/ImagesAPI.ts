import Page from "../Page";
import path from 'path'
import fs from 'fs';
import stream from 'stream'

export default class ImagesAPI extends Page {

    public static base_url: string = "/images";
    constructor(data: any, base_url?: string) {
        super(base_url + ImagesAPI.base_url);
        this.run();
    }

    private run() {
        this.router.get("/:path", (req: any, res: any) => {
            const imagePath = path.join(process.cwd(), `/LocalDatabase/images/${req.params.path}`);
            console.log("Trying to serve image: " + imagePath);
            if (fs.existsSync(imagePath)) {
                res.sendFile(imagePath);
            } else res.json({ error: "Image not found." })
        })
    }
}