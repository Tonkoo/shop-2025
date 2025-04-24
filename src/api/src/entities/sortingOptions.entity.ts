import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class SortingOptions extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  order: string;

  @Column()
  default: boolean;

  @Column()
  code: string;

  @Column()
  field: string;
}
