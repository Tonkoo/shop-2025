import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class admins {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  login: string;

  @Column()
  password: string;
}
