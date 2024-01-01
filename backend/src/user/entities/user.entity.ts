import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as argon2 from 'argon2';
import { List } from '../../list/entities/list.entity';

@Entity()
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  email: string;

  @Column()
  public password: string;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];

  public async isPasswordValid(password: string): Promise<boolean> {
    return argon2.verify(this.password || '', password);
  }
}
