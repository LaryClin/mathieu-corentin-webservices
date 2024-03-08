import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  nom: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  prenom: string;

  @ApiProperty({ example: 'john.doe@zzz.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ example: 'password123', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: [2, 3], required: false })
  @IsArray()
  @IsOptional()
  projectsIds?: number[];

  @ApiProperty({ example: ['VueJS', 'TypeScript'], required: false })
  @IsArray()
  @IsOptional()
  competencesName?: string[];
}
