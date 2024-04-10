import { Schema } from "mongoose";
export default class EntitySchema extends Schema {
    model: string;
    constructor({ id, options, schema }: {
        id?: {
            enabled: boolean;
            key: string;
            value: any;
        };
        schema?: any;
        options?: any;
    });
}