import Request from "../../../Instances/Request";
import { RequestType } from "../../../Instances/RequestType";
import Page from "../Page";

export default class ProductPurchaseAPI extends Page {
    private data: any;
    public static base_url: string = "/product";
    constructor(data: any, base_url?: string) {
        super(base_url + ProductPurchaseAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post(["/purchase", "/rfq"], async (req: any, res: any) => {
            const { productId, token, userId, supplierId, customerId, type, rfqSettings } = req.body;
            const requestType = type == "purchase" ? RequestType.PURCHASE : RequestType.RFQ;
            if (!productId || !token || !userId || !supplierId) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            const request = await new Request().setRfqSettings(rfqSettings).processPurchase(requestType, productId, supplierId, customerId, userId);
            return res.send({ message: "Purchase request sent successfully", success: 1, request })
        });
    }
}