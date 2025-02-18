import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
} from 'typeorm';
import { Products } from './products.entity';

@Entity()
export class Sections extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('simple-array')
  images: number[];

  @CreateDateColumn({ name: 'create_at' })
  create_at: Date;

  @UpdateDateColumn({ name: 'update_at' })
  update_at: Date;

  @Column({ name: 'id_parent' })
  id_parent: number;

  @OneToMany(() => Products, (item) => item.id_section)
  products: Products[];
}
