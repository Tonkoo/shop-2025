import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from 'typeorm';
import { Sections } from './sections.entity';
import { Colors } from './colors.entity';

@Entity({})
export class Products extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column('int', { array: true, nullable: true })
  images: number[] | null;

  @Column()
  price: number;

  @ManyToOne(() => Colors, (item) => item.products)
  @JoinColumn({ name: 'id_color' })
  color: Colors;

  @Column()
  description: string;

  @ManyToOne(() => Sections, (item) => item.products)
  @JoinColumn({ name: 'id_section' })
  section: Sections;

  @Column({ default: false, name: 'show_on_main' })
  show_on_main: boolean;

  @Column({ default: true, name: 'main_slider' })
  main_slider: boolean;

  @UpdateDateColumn({ name: 'update_at' })
  update_at: Date;

  @CreateDateColumn({ name: 'create_at' })
  create_at: Date;
}
