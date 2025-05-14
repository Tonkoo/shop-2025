import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Products } from './products.entity.js';

@Entity()
export class Colors extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  hex: string;

  @OneToMany(() => Products, (item) => item.color, { onDelete: 'CASCADE' })
  products: Products[];
}
