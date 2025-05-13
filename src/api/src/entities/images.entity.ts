import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Sections } from './sections.entity.js';

@Entity()
export class Images extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  type: string;

  @OneToMany(() => Sections, (item) => item.images, { onDelete: 'CASCADE' })
  sections: Sections[];
}
