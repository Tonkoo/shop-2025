import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { sections } from './sections.entity';

@Entity({})
export class products {
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

  @ManyToOne(() => sections, { nullable: true })
  @JoinColumn({ name: 'id_section' })
  id_section: sections;

  @Column({ default: false })
  show_on_main: boolean;

  @Column({ default: true })
  main_slider: boolean;

  @UpdateDateColumn()
  update_at: Date;

  @CreateDateColumn()
  create_at: Date;
}
