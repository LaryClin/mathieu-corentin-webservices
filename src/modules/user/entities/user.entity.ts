import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { Role } from '../../role/entities/role.entity';
import { Project } from '../../project/entities/project.entity';
import { Competence } from '../../competence/entities/competence.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @ManyToMany(() => Project, (project) => project.members)
  @JoinTable()
  projects: Project[];

  @ManyToMany(() => Competence, (competence) => competence.users)
  @JoinTable()
  competences: Competence[];
}
