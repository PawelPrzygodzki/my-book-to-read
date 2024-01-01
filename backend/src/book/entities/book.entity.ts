import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { List } from '../../list/entities/list.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  authorName: string;

  @Column()
  externalKey: string;

  @ManyToMany((type) => List, (list) => list.books)
  lists: List[];
}
