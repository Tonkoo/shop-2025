import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
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

  @ManyToOne(() => Sections, (Sections) => Sections.products)
  section: Sections;

  @Column({ default: false })
  show_on_main: boolean;

  @Column({ default: true })
  main_slider: boolean;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  create_at: Date;
}