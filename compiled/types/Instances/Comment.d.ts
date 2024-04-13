import { ObjectId } from '../Types/ObjectId';
export default class Comment {
    _id: ObjectId;
    commentId: string;
    content: string;
    user: ObjectId;
    product: ObjectId;
    constructor(input?: any);
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
