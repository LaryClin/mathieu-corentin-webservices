import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCompetenceDto {
  @ApiProperty({
    description: 'Le nom unique de la compétence',
    example: 'NodeJS',
  })
  @IsNotEmpty()
  @IsString()
  nom: string;
}
