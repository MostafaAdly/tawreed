import { ObjectId } from '../Types/ObjectId';
import { RequestType } from './enums/RequestType';
import { ResponseType } from './enums/ResponseType';
import RFQSettings from './RFQSettings';
export default class Request {
    _id: ObjectId;
    requestId: string;
    product: ObjectId;
    responseType: ResponseType;
    requestType: RequestType;
    payment: ObjectId;
    rfqSettings: RFQSettings;
    supplier: ObjectId;
    customer: ObjectId;
    user: ObjectId;
    instant: boolean;
    constructor(input?: any);
    processPurchase: (requestType: RequestType, productId: mongoose.Types.ObjectId, supplierId: mongoose.Types.ObjectId, customerId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => Promise<this>;
    setRfqSettings: (rfqSettings: RFQSettings) => Request;
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
