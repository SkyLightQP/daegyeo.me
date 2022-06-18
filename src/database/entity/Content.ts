import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Section from './Section';
import Link from './Link';

@Entity({
  name: 'contents'
})
class Content {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  subtitle!: string;

  @Column()
  stack!: string;

  @Column()
  order!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne('Section', 'contents')
  section!: Section;

  @OneToMany('Link', 'content')
  links!: Link[];
}

export default Content;
