import { IsOptional, IsString, IsIn } from 'class-validator';

export class QueryFilterProjectDto {
  @IsOptional()
  @IsString()
  competence?: string;

  @IsOptional()
  @IsString()
  @IsIn(['dateCreation', 'nom'])
  sortBy?: 'dateCreation' | 'nom';

  @IsOptional()
  @IsString()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC';
}
