import { ObjectId } from '../Types/ObjectId';
import { RequestType } from './RequestType';
import { ResponseType } from './ResponseType';
import RFQSettings from './RFQSettings';
export default class Request {
    _id: ObjectId;
    requestId: string;
    product: ObjectId;
    responseType: ResponseType;
    requestType: RequestType;
    rfqSettings: RFQSettings;
    entity: ObjectId;
    user: ObjectId;
    constructor(input?: any);
    processPurchase: (requestType: RequestType, productId: mongoose.Types.ObjectId, supplierId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => Promise<this>;
    setRfqSettings: (rfqSettings: RFQSettings) => Request;
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
