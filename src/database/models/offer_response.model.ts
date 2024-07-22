import { ChildEntity, Column, OneToOne } from "typeorm";
import Post from "./post.model";
import Offer from "./offer.model";

@ChildEntity()
export default class OfferResponse extends Post {

  @Column({ type: 'integer', default: 0 })
  price: string;

  @Column({ type: 'integer', default: 0 })
  vat: string;

  @Column({ type: 'integer', default: 0 })
  totalPrice: string;

  @Column({ type: 'varchar', default: 'CASH' })
  paymentTerms: string;

  @Column({ type: 'varchar', default: 'CASH' })
  paymentMethod: string;

  @Column({ type: 'varchar', default: new Date() })
  startDate: Date;

  @Column({ type: 'varchar', default: new Date() })
  endDate: Date;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @OneToOne(() => Offer, offer => offer.offerResponse)
  offer: Offer;
}