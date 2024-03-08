import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './modules/user/entities/user.entity';
import { UserService } from './modules/user/user.service';
import { UserController } from './modules/user/user.controller';

import { Role } from './modules/role/entities/role.entity';
import { RoleService } from './modules/role/role.service';
import { RoleController } from './modules/role/role.controller';

import { Project } from './modules/project/entities/project.entity';
import { ProjectService } from './modules/project/project.service';
import { ProjectController } from './modules/project/project.controller';

import { Competence } from './modules/competence/entities/competence.entity';
import { CompetenceService } from './modules/competence/competence.service';
import { CompetenceController } from './modules/competence/competence.controller';
import { AuthService } from './modules/auth/auth.service';
import { AuthController } from './modules/auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './modules/auth/auth.module';
import { LocalStrategy } from './modules/auth/strategies/local-strategy';
import { JwtStrategy } from './modules/auth/strategies/jwt-strategy';
import { RefreshJwtStrategy } from './modules/auth/strategies/refreshToken.strategy';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Rend le module global
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Project, Role, Competence]),
  ],
  providers: [
    UserService,
    ProjectService,
    RoleService,
    CompetenceService,
    AuthService,
    JwtService,
    AuthModule,
    JwtStrategy,
    RefreshJwtStrategy,
    LocalStrategy,
  ],
  controllers: [
    UserController,
    ProjectController,
    RoleController,
    CompetenceController,
    AuthController,
  ],
})
export class AppModule {}
