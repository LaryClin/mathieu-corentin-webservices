import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateCompetenceDto {
  @ApiProperty({
    description: 'Le nouveau nom de la compétence',
    example: 'ExpressJS',
    required: false,
  })
  @IsOptional()
  @IsString()
  nom?: string;
}
