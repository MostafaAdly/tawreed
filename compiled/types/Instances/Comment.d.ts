import { ObjectId } from '../Types/ObjectId';
export default class EntityRole {
    _id: ObjectId;
    commentId: string;
    name: string;
    body: string;
    user: ObjectId;
    constructor({ id }: {
        id: string;
    });
    constructor({ id, name, body, user }: {
        id?: string;
        name: string;
        body: string;
        user: string;
    });
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
