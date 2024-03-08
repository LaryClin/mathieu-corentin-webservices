import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProjectDto {
  @ApiProperty({ description: 'Nom du projet' })
  @IsNotEmpty()
  @IsString()
  nom: string;

  @ApiProperty({ description: 'Description du projet' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ description: 'Date de début du projet' })
  @IsNotEmpty()
  @IsDateString()
  dateDebut: Date;

  @ApiProperty({ description: 'Date de fin du projet' })
  @IsOptional()
  @IsDateString()
  dateFin?: Date;

  @ApiProperty({ description: 'Membres du projet' })
  @IsOptional()
  membersIds?: number[];
}
