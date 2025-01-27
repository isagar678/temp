import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:true})
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
