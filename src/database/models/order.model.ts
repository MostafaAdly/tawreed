import { Column, Entity, OneToOne } from "typeorm";
import Post from "./post.model";
import Offer from "./offer.model";

@Entity()
export default class Order extends Post {

  @Column({ type: 'varchar', length: 255, nullable: false })
  status: string;

  @OneToOne(() => Offer, offer => offer.order)
  offer: Offer;
}