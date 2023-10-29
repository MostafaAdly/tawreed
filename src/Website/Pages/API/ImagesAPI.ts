import Page from "../Page";

export default class ImagesAPI extends Page {
    private data: any;
    public static base_url: string = "/api/v1";
    constructor(data: any, base_url?: string) {
        super(base_url || ImagesAPI.base_url);
        this.data = data;
        this.run();
    }

    public run() {
        this.router.get("/images/:fileName", (req, res) => {
            const imagePath = `/LocalDatabase/${req.params.fileName}`;
            const imageName = req.params.fileName;
            return res.render(`API/imageRender`, { imagePath, imageName });
        });
    }
}