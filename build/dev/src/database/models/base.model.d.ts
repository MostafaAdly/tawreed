import { BaseEntity } from 'typeorm';
export default class BaseModel extends BaseEntity {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
