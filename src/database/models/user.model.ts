import { Column, Entity, TableInheritance } from "typeorm";
import BaseModel from "./base.model";

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class User extends BaseModel {

    @Column()
    username: string

    @Column()
    hashed_password: string

    @Column()
    email: string

    @Column('jsonb', { default: {} })
    metadata: object = {};
}