import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { QueryFilterUserDto } from './dto/query-user.dto';
import { CompetenceService } from '../competence/competence.service';
import { ProjectService } from '../project/project.service';
import { Project } from '../project/entities/project.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
    private readonly competenceService: CompetenceService,
    private readonly projectService: ProjectService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const userCompetences = await this.competenceService.findOrCreate(
      createUserDto.competencesName,
    );
    const userProjects = [];

    for (const projectId of createUserDto.projectsIds) {
      const project = await this.projectService.findOne(projectId);
      userProjects.push(project.id);
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
      competences: userCompetences,
      projects: userProjects,
    });

    await this.usersRepository.save(user);
  }

  async findAll(queryFilter: QueryFilterUserDto): Promise<User[]> {
    const { competence, sortBy, order = 'ASC' } = queryFilter;

    const queryBuilder = this.usersRepository.createQueryBuilder('user');

    if (competence) {
      queryBuilder.innerJoinAndSelect(
        'user.competences',
        'competence',
        'competence.nom = :competence',
        { competence },
      );
    }

    if (sortBy) {
      queryBuilder.orderBy(sortBy, order);
    }

    return queryBuilder.getMany();
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: ['role', 'competences', 'projects'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
      relations: ['role', 'competences', 'projects'],
    });
    if (!user) {
      throw new NotFoundException(`User with Email ${email} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const updateUser = await this.usersRepository.preload({
      id: +id,
      ...updateUserDto,
      projects: updateUserDto.projectsIds
        ? await this.projectRepository.findBy({
            id: In(updateUserDto.projectsIds),
          })
        : undefined,
      competences: updateUserDto.competencesName
        ? await this.competenceService.findOrCreate(
            updateUserDto.competencesName,
          )
        : undefined,
    });

    if (!updateUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.usersRepository.save(updateUser);
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
