import { ChildEntity, Column } from "typeorm";
import User from "./user.model";

@ChildEntity()
export default class Admin extends User {

    @Column()
    role: string;
}