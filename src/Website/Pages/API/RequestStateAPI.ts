import mongoose from "mongoose";
import Request from "../../../Instances/Request";
import { ResponseType } from '../../../Instances/enums/ResponseType';
import Page from "../Page";
import Payment from "../../../Instances/Payment";
import { RequestType } from "../../../Instances/enums/RequestType";
import MyRequests from "../Personas/Supplier/MyRequests";

export default class RequestStateAPI extends Page {
    private data: any;
    public static base_url: string = "/request";
    constructor(data: any, base_url?: string) {
        super(base_url + RequestStateAPI.base_url);
        this.data = data;
        this.run();
    }

    private run() {
        this.router.post('/', async (req: any, res: any) => {
            const { requestId, userId, token, state } = req.body;
            if (!requestId || !token || !userId || !state) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            if (!Object.keys(ResponseType).includes(state)) return res.status(400).send({ message: "Invalid state" });
            const request = await mongoose.models.Request.findOne({ _id: requestId }).populate({
                path: 'product', select: "entity"
            });
            if (!request) return res.status(404).send({ message: "Request not found" });
            const toUpdate: any = { responseType: (ResponseType as any)[state] }
            if (ResponseType.PURCHASE_DELIVERED && !request.payment) {
                var payment = new Payment({
                    request: requestId,
                    customer: request.customer,
                    supplier: request.supplier,

                });
                payment.save();
                toUpdate.payment = payment._id;
            }
            mongoose.models.Request.updateOne({ _id: requestId }, toUpdate).exec();
            return res.status(200).send({ message: "Request state updated successfully", success: 1 });
        });

        this.router.delete('/delete', async (req: any, res: any) => {
            const { requestId, userId, token } = req.body;
            if (!requestId || !token || !userId) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            const request = await new Request().load({ _id: requestId });
            if (!request) return res.status(404).send({ message: "Request not found" });
            if (request.responseType == ResponseType.PURCHASE_DELIVERED)
                return res.status(400).send({ message: "Delivered orders cannot be deleted.", error: 1 })
            mongoose.models.Request.deleteOne({ _id: requestId }).exec();
            return res.send({ message: "Request deleted successfully", success: 1 });
        });
        this.router.post('/count', async (req: any, res: any) => {
            const { userId, customerId, token } = req.body;
            if (!token || !userId || !customerId) return res.status(400).send({ message: "Invalid request" });
            const isValidToken = await this.data.server.sessionHandler.validateUserByToken(userId, token);
            if (!isValidToken) return res.status(401).send({ message: "Invalid token", error: 1 });
            const requests = await mongoose.models.Request
                .find({ customer: customerId })
                .select("requestType").exec();
            return res.send({
                total: requests.length,
                purchase: requests.filter(request => request.requestType == RequestType.PURCHASE).length,
                rfq: requests.filter(request => request.requestType == RequestType.RFQ).length
            });
        });
    }
}