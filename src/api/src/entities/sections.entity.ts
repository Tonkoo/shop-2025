import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Products } from './products.entity.js';

@Entity()
export class Sections extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('int', { array: true, nullable: true })
  images: number[] | null;

  @CreateDateColumn({ name: 'create_at' })
  create_at: Date;

  @UpdateDateColumn({ name: 'update_at' })
  update_at: Date;

  @Column({ name: 'id_parent', nullable: true })
  id_parent: number;

  @Column()
  level: number;

  @OneToMany(() => Products, (item) => item.section, { onDelete: 'CASCADE' })
  products: Products[];
}
