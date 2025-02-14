import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class images {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  path: string;

  @Column()
  type: string;
}
