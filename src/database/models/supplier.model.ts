import { ChildEntity } from "typeorm";
import User from "./user.model";

@ChildEntity()
export default class Supplier extends User {
}