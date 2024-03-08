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
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectService } from './project.service';
import { Roles } from '../role/guard/role.decorator';
import { Role } from '../role/guard/role.enum';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Project } from './entities/project.entity';
import { QueryFilterProjectDto } from './dto/query-project.dto';
import { RolesGuard } from '../role/guard/role.guard';

@ApiTags('projects')
@UseGuards(RolesGuard)
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Crée un nouveau projet' })
  @ApiResponse({
    status: 201,
    description: 'Le projet a été créé avec succès.',
    type: Project,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste tous les projets' })
  @ApiResponse({
    status: 200,
    description: 'Liste des projets récupérée avec succès.',
    type: [Project],
  })
  @ApiQuery({ type: QueryFilterProjectDto })
  findAll() {
    return this.projectService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Trouve un projet par ID' })
  @ApiResponse({ status: 200, description: 'Projet trouvé.', type: Project })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @ApiBearerAuth()
  @Roles(Role.User, Role.Admin)
  findOne(@Param('id') id: number) {
    return this.projectService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Mise à jour d’un projet par ID' })
  @ApiResponse({
    status: 200,
    description: 'Projet mis à jour avec succès.',
    type: Project,
  })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @Roles(Role.Admin)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprime un projet par ID' })
  @ApiResponse({ status: 204, description: 'Projet supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Projet non trouvé.' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
