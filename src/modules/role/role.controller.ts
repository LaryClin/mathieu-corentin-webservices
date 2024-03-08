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
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleService } from './role.service';
import { Roles } from './guard/role.decorator';
import { Role } from './guard/role.enum';
import { Role as RoleEntity } from './entities/role.entity';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RolesGuard } from './guard/role.guard';

@ApiTags('roles')
@UseGuards(RolesGuard)
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Crée un nouveau rôle' })
  @ApiResponse({
    status: 201,
    description: 'Le rôle a été créé avec succès.',
    type: RoleEntity,
  })
  @ApiBearerAuth()
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste tous les rôles' })
  @ApiResponse({
    status: 200,
    description: 'Liste des rôles récupérée avec succès.',
    type: [RoleEntity],
  })
  async getAllRoles() {
    return this.roleService.findAll();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Trouve un rôle par ID' })
  @ApiResponse({ status: 200, description: 'Rôle trouvé.', type: RoleEntity })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  @ApiBearerAuth()
  async getRoleById(@Param('id') id: number) {
    return this.roleService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Mise à jour d’un rôle par ID' })
  @ApiResponse({
    status: 200,
    description: 'Rôle mis à jour avec succès.',
    type: RoleEntity,
  })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  @ApiBearerAuth()
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Supprime un rôle par ID' })
  @ApiResponse({ status: 204, description: 'Rôle supprimé avec succès.' })
  @ApiResponse({ status: 404, description: 'Rôle non trouvé.' })
  @ApiBearerAuth()
  async deleteRole(@Param('id') id: string) {
    return this.roleService.delete(id);
  }
}
