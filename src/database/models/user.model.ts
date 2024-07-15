import { Column, Entity, TableInheritance } from "typeorm";
import BaseModel from "./base.model";
import companySizeConfig from "src/config/core/company-size.config";

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class User extends BaseModel {

    @Column()
    type: string;

    @Column()
    username: string

    @Column()
    hashed_password: string

    @Column()
    email: string

    @Column({ length: 15 })
    phone: string

    @Column({ default: false })
    isCompany: boolean

    @Column({ type: 'jsonb', default: JSON.stringify({ size: companySizeConfig[0].name }) })
    company: { size: string, address?: string, notes?: string };

    @Column('jsonb', { default: {} })
    metadata: object = {};
}