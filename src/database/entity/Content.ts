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
  description!: string;

  @Column()
  stack!: string;

  @Column()
  order!: number;

  @Column({ default: true })
  hasMargin!: boolean;

  @Column({ default: false })
  isHidden!: boolean;

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
