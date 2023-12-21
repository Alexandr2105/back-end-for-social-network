import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './features/users/entites/users.entity';
import { AuthController } from './features/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CreateJwt } from './features/auth/create.jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './features/users/users.repository';
import { CheckEmailInDb } from './features/auth/validators/check.email.in.db';
import { UsersQueryRepository } from './features/users/users.query.repository';
import { CreateUserUseCase } from './features/auth/application/useCases/create.user.use-case';
import { BcryptService } from './common/bcript/bcript.service';
import { LocalStrategy } from './common/strategies/local.strategy';
import { CreateJwtUseCase } from './features/auth/application/useCases/create.jwt.use-case';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { GetInformationAboutUserUseCase } from './features/users/application/useCase/get.information.about.user.use-case';
import { UsersController } from './features/users/users.controller';
import { GetAllUsersUseCase } from './features/users/application/useCase/get.All.users.use-case';
import { UpdateUserUseCase } from './features/users/application/useCase/update.user.use-case';
import { CheckUserIdInDb } from './features/users/validators/check.user.id.in.db';
import { DeleteUserUseCase } from './features/users/application/useCase/delete.user.use-case';
import { QueryHelper } from './common/helper/query.helper';

config();

const entities = [UserEntity];
const strategies = [LocalStrategy, JwtStrategy];
const useCases = [
  CreateUserUseCase,
  CreateJwtUseCase,
  GetInformationAboutUserUseCase,
  GetAllUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
];
const repositories = [UsersRepository, UsersQueryRepository];
const validators = [CheckEmailInDb, CheckUserIdInDb];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        ssl: true,
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        entities: [...entities],
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(entities),
    JwtModule.register({}),
    CqrsModule,
  ],
  controllers: [AppController, AuthController, UsersController],
  providers: [
    AppService,
    CreateJwt,
    BcryptService,
    QueryHelper,
    ...strategies,
    ...useCases,
    ...repositories,
    ...validators,
  ],
})
export class AppModule {}
