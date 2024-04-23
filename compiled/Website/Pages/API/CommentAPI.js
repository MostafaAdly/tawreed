"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Page_1 = __importDefault(require("../Page"));
const Comment_1 = __importDefault(require("../../../Instances/Comment"));
class CommentAPI extends Page_1.default {
    constructor(data, base_url) {
        super(base_url + CommentAPI.base_url);
        this.data = data;
        this.run();
    }
    run() {
        this.router.post('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { productId, token, userId, content } = req.body;
            if (!productId || !token || !userId || !content || content.replaceAll(" ", "") == "")
                return res.status(400).send({ message: "Invalid request" });
            const isValidToken = yield this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken)
                return res.status(401).send({ message: "Invalid token", error: 1 });
            yield new Comment_1.default({ content, user: userId, product: productId }).save();
            return res.send({ message: "Comment added successfully", success: 1 });
        }));
    }
}
CommentAPI.base_url = "/comment";
exports.default = CommentAPI;
