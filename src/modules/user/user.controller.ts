import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Role } from '../role/guard/role.enum';
import { Roles } from '../role/guard/role.decorator';
import { QueryFilterUserDto } from './dto/query-user.dto';
import { RolesGuard } from '../role/guard/role.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';

@ApiTags('users')
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Crée un nouvel utilisateur' })
  @ApiResponse({
    status: 201,
    description: "L'utilisateur a été créé avec succès.",
    type: User,
  })
  @ApiResponse({ status: 400, description: 'Requête invalide.' })
  @ApiBearerAuth()
  @Roles(Role.Admin)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste tous les utilisateurs' })
  @ApiResponse({
    status: 200,
    description: 'Liste des utilisateurs récupérée avec succès.',
    type: [User],
  })
  @ApiQuery({ type: QueryFilterUserDto })
  findAll(@Query() queryFilter: QueryFilterUserDto) {
    return this.userService.findAll(queryFilter);
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @ApiOperation({ summary: 'Trouve un utilisateur par ID' })
  @ApiResponse({ status: 200, description: 'Utilisateur trouvé.', type: User })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @ApiBearerAuth()
  async findUserById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Put(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Mise à jour d’un utilisateur par ID' })
  @ApiResponse({
    status: 200,
    description: 'Utilisateur mis à jour avec succès.',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @ApiBearerAuth()
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @ApiOperation({ summary: 'Supprime un utilisateur par ID' })
  @ApiResponse({
    status: 204,
    description: 'Utilisateur supprimé avec succès.',
  })
  @ApiResponse({ status: 404, description: 'Utilisateur non trouvé.' })
  @ApiBearerAuth()
  async deleteUser(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
