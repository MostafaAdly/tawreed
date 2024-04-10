import { Schema } from "mongoose";
export default class EntitySchema extends Schema {
    model: string;
    constructor({ id, schema }: {
        id?: {
            key: string;
            value: any;
        };
        schema?: any;
    });
}
