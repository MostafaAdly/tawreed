import { ChildEntity, Column, JoinColumn, OneToOne } from "typeorm";
import Post from "./post.model";
import OfferResponse from "./offer_response.model";
import Order from "./order.model";

@ChildEntity()
export default class Offer extends Post {

  @Column({ type: 'varchar', length: 255 })
  status: string;

  @OneToOne(() => OfferResponse, offerResponse => offerResponse.offer)
  @JoinColumn()
  offerResponse: OfferResponse;

  @OneToOne(() => Order, order => order.offer)
  @JoinColumn()
  order: Order;
}