import { ObjectId } from "../Types/ObjectId";
export default class Department {
    _id: ObjectId;
    departmentId: string;
    name: string;
    images: string[];
    constructor(input?: any);
    load: (query: any) => Promise<this | undefined>;
    save: () => Promise<void>;
}
