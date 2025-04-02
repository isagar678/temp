import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn({type:'integer'})
  id: number;

  @Column({nullable:true})
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable:true})
  createdAt: Date;

  @Column({nullable:true})
  updatedAt: Date;
}
