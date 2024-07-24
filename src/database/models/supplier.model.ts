import { ChildEntity, Column } from "typeorm";
import User from "./user.model";

@ChildEntity()
export default class Supplier extends User {

  @Column({ type: 'varchar', length: 100, nullable: false })
  industry: string;
}