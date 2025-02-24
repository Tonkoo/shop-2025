import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToMany,
  BaseEntity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Products } from './products.entity';
import { Images } from './images.entity';

@Entity()
export class Sections extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @ManyToOne(() => Images, (item) => item.sections)
  @JoinColumn({ name: 'images' })
  images: Images[];

  @CreateDateColumn({ name: 'create_at' })
  create_at: Date;

  @UpdateDateColumn({ name: 'update_at' })
  update_at: Date;

  @Column({ name: 'id_parent' })
  id_parent: number;

  @OneToMany(() => Products, (item) => item.id_section, { onDelete: 'CASCADE' })
  products: Products[];
}
