import { ObjectId } from '../Types/ObjectId';
import { RequestType } from './RequestType';
import { ResponseType } from './ResponseType';
export default class Request {
    _id: ObjectId;
    requestId: string;
    product: ObjectId;
    responseType: ResponseType;
    requestType: RequestType;
    entity: ObjectId;
    user: ObjectId;
    constructor(input?: any);
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
