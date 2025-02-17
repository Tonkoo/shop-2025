import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Sections } from './sections.entity';

@Entity({})
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('simple-array')
  images: number[];

  @Column()
  price: number;

  @Column()
  color: string;

  @Column()
  description: string;

  @ManyToOne(() => Sections, (item) => item.products)
  @JoinColumn({ name: 'id_section' })
  id_section: Sections;

  @Column({ default: false, name: 'show_on_main' })
  show_on_main: boolean;

  @Column({ default: true, name: 'main_slider' })
  main_slider: boolean;

  @UpdateDateColumn({ name: 'update_at' })
  update_at: Date;

  @CreateDateColumn({ name: 'create_at' })
  create_at: Date;
}
