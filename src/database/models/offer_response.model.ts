import { ChildEntity, Column, OneToOne } from "typeorm";
import Post from "./post.model";
import Offer from "./offer.model";

@ChildEntity()
export default class OfferResponse extends Post {

  @Column({ type: 'integer', default: 0 })
  price: number;

  @Column({ type: 'date', default: new Date() })
  deliveryDate: Date;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @OneToOne(() => Offer, offer => offer.offerResponse)
  offer: Offer;
}