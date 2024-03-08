import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column('text')
  description: string;

  @Column()
  dateDebut: Date;

  @Column({ nullable: true })
  dateFin: Date;

  @ManyToMany(() => User, (user) => user.projects)
  @JoinTable()
  members: User[];
}
