import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Competence } from './entities/competence.entity';
import { CompetenceController } from './competence.controller';
import { CompetenceService } from './competence.service';

@Module({
  imports: [TypeOrmModule.forFeature([Competence])],
  controllers: [CompetenceController],
  providers: [CompetenceService],
})
export class CompetenceModule {}
