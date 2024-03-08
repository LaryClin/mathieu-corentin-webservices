import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CompetenceService } from './competence.service';
import { CreateCompetenceDto, UpdateCompetenceDto } from './dto';
import { Roles } from '../role/guard/role.decorator';
import { Role } from '../role/guard/role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from '../role/guard/role.guard';
import { Competence } from './entities/competence.entity';

@ApiTags('competences')
@UseGuards(RolesGuard)
@Controller('competences')
export class CompetenceController {
  constructor(private readonly competenceService: CompetenceService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crée une nouvelle compétence' })
  @ApiResponse({
    status: 201,
    description: 'La compétence a été créée avec succès.',
    type: Competence,
  })
  @ApiBearerAuth()
  create(@Body() createCompetenceDto: CreateCompetenceDto) {
    return this.competenceService.create(createCompetenceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste toutes les compétences' })
  @ApiResponse({
    status: 200,
    description: 'Liste des compétences récupérée avec succès.',
    type: [Competence],
  })
  @ApiBearerAuth()
  findAll() {
    return this.competenceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouve une compétence par ID' })
  @ApiResponse({
    status: 200,
    description: 'Compétence trouvée.',
    type: Competence,
  })
  @ApiResponse({ status: 404, description: 'Compétence non trouvée.' })
  @ApiBearerAuth()
  @Roles(Role.Admin, Role.User)
  findOne(@Param('id') id: number) {
    return this.competenceService.findOne(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Mise à jour d’une compétence par ID' })
  @ApiResponse({
    status: 200,
    description: 'Compétence mise à jour avec succès.',
    type: Competence,
  })
  @ApiResponse({ status: 404, description: 'Compétence non trouvée.' })
  @ApiBearerAuth()
  update(
    @Param('id') id: number,
    @Body() updateCompetenceDto: UpdateCompetenceDto,
  ) {
    return this.competenceService.update(id, updateCompetenceDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Supprime une compétence par ID' })
  @ApiResponse({
    status: 204,
    description: 'Compétence supprimée avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Compétence non trouvée.' })
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.competenceService.remove(id);
  }
}
