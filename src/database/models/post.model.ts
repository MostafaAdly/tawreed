import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, TableInheritance } from "typeorm";
import User from "./user.model";

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export default class Post extends BaseEntity {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', nullable: false })
  industry: string;

  @Column({ type: 'integer', nullable: false })
  quantity: number;

  @Column({ type: 'jsonb', nullable: false })
  images: string[];

  @Column({ type: 'jsonb', default: {} })
  metadata: object;

  @ManyToOne(() => User, user => user.posts)
  client: User;

  @ManyToOne(() => User, user => user.posts)
  supplier: User;
}