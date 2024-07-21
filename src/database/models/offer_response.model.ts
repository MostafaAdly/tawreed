import { ChildEntity, Column, OneToOne } from "typeorm";
import Post from "./post.model";
import Offer from "./offer.model";

@ChildEntity()
export default class OfferResponse extends Post {

  @Column({ type: 'integer', default: 0 })
  price: number;

  @Column({ type: 'integer', default: 0 })
  vat: number;

  @Column({ type: 'integer', default: 0 })
  total_price: number;

  @Column({ type: 'varchar', default: 'CASH' })
  paymentTerms: string;

  @Column({ type: 'varchar', default: 'CASH' })
  paymentMethod: string;

  @Column({ type: 'date', default: new Date() })
  startDate: Date;

  @Column({ type: 'date', default: new Date() })
  endDate: Date;

  @Column({ type: 'text', nullable: false })
  comment: string;

  @OneToOne(() => Offer, offer => offer.offerResponse)
  offer: Offer;
}