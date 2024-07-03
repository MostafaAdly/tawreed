import { ChildEntity, Column } from "typeorm";
import User from "./user.model";

@ChildEntity()
export default class Client extends User {

    @Column()
    role: string;
}