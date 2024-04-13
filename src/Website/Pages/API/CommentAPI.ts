import Page from "../Page";
import Comment from '../../../Instances/Comment'

export default class CommentAPI extends Page {
    private data: any;
    public static base_url: string = "/comment";
    constructor(data: any, base_url?: string) {
        super(base_url + CommentAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/', async (req: any, res: any) => {
            const { productId, token, userId, content } = req.body;
            if (!productId || !token || !userId || !content || content.replaceAll(" ", "") == "") return res.status(400).send({ message: "Invalid request" });
            console.log("test");
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            console.log("asd");
            await new Comment({ content, user: userId, product: productId }).save();
            return res.send({ message: "Comment added successfully", success: 1 });
        });
    }
}