import { ChildEntity, Column, JoinColumn, OneToOne } from "typeorm";
import Post from "./post.model";
import OfferResponse from "./offer_response.model";
import Order from "./order.model";
import { OfferStatus } from "src/config/enums/offer_status.enum";

@ChildEntity()
export default class Offer extends Post {

  @Column({ type: 'varchar', length: 255, default: OfferStatus.New, nullable: false })
  status: string;

  @OneToOne(() => OfferResponse, offerResponse => offerResponse.offer)
  @JoinColumn()
  offerResponse: OfferResponse;

  @OneToOne(() => Order, order => order.offer)
  @JoinColumn()
  order: Order;
}