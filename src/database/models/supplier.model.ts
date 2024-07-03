import { Column } from "typeorm";
import User from "./user.model";

export default class Supplier extends User {

    @Column()
    role: string;
}