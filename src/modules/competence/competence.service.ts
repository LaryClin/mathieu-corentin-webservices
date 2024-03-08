import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Competence } from './entities/competence.entity';
import { CreateCompetenceDto, UpdateCompetenceDto } from './dto';
import synonymes from '../../config/synonymes.json';

@Injectable()
export class CompetenceService {
  constructor(
    @InjectRepository(Competence)
    private readonly competenceRepository: Repository<Competence>,
  ) {}

  async create(createCompetenceDto: CreateCompetenceDto): Promise<Competence> {
    const nom = this.normalizeName(createCompetenceDto.nom);
    let competence = await this.competenceRepository.findOne({
      where: { nom },
    });

    if (!competence) {
      competence = this.competenceRepository.create({ nom });
      await this.competenceRepository.save(competence);
    }

    return competence;
  }

  async update(
    id: number,
    updateCompetenceDto: UpdateCompetenceDto,
  ): Promise<Competence> {
    const nom = this.normalizeName(updateCompetenceDto.nom);
    const competence = await this.competenceRepository.preload({
      id,
      nom,
    });

    if (!competence) {
      throw new Error(`Competence with ID ${id} not found`);
    }

    return this.competenceRepository.save(competence);
  }

  async findAll(): Promise<Competence[]> {
    return this.competenceRepository.find();
  }

  async findOne(id: number): Promise<Competence> {
    const competence = await this.competenceRepository.findOne({
      where: { id },
    });
    if (!competence) {
      throw new NotFoundException(`Competence with ID "${id}" not found`);
    }
    return competence;
  }

  async findOrCreate(competenceNames: string[]): Promise<Competence[]> {
    const competences: Competence[] = [];

    for (const name of competenceNames) {
      let competence = await this.findByName(name);

      if (!competence) {
        competence = await this.competenceRepository.create({ nom: name });
        await this.competenceRepository.save(competence);
      }

      competences.push(competence);
    }

    return competences;
  }

  async findByName(nom: string): Promise<Competence> {
    const competence = await this.competenceRepository.findOne({
      where: { nom },
    });
    if (!competence) {
      throw new NotFoundException(`Competence with Name "${nom}" not found`);
    }
    return competence;
  }

  async remove(id: number): Promise<void> {
    const result = await this.competenceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Competence with ID "${id}" not found`);
    }
  }

  private normalizeName(nom: string): string {
    let normalizedNom = nom.trim().toLowerCase();

    Object.keys(synonymes).forEach((standard) => {
      synonymes[standard].forEach((variant) => {
        if (normalizedNom === variant) normalizedNom = standard;
      });
    });

    return normalizedNom;
  }
}
