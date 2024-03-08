import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class QueryFilterUserDto {
  @ApiPropertyOptional({ example: 'NodeJS' })
  @IsOptional()
  @IsString()
  competence?: string;

  @IsOptional()
  @IsString()
  sortBy?: 'dateCreation';

  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';
}
