import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { UserEntity } from './features/users/entites/users.entity';
import { AuthController } from './features/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ServiceJwt } from './features/auth/service.jwt';
import { CqrsModule } from '@nestjs/cqrs';
import { UsersRepository } from './features/users/users.repository';
import { CheckEmailInDb } from './features/auth/validators/check.email.in.db';
import { UsersQueryRepository } from './features/users/users.query.repository';
import { CreateUserUseCase } from './features/users/application/useCases/create.user.use-case';
import { BcryptService } from './common/bcript/bcript.service';
import { LocalStrategy } from './common/strategies/local.strategy';
import { CreateJwtUseCase } from './features/auth/application/useCases/create.jwt.use-case';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { GetInformationAboutUserUseCase } from './features/users/application/useCases/get.information.about.user.use-case';
import { UsersController } from './features/users/users.controller';
import { GetAllUsersUseCase } from './features/users/application/useCases/get.All.users.use-case';
import { UpdateUserUseCase } from './features/users/application/useCases/update.user.use-case';
import { CheckUserIdInDb } from './features/users/validators/check.user.id.in.db';
import { DeleteUserUseCase } from './features/users/application/useCases/delete.user.use-case';
import { QueryHelper } from './common/helper/query.helper';
import { ContactsUserEntity } from './features/profiles/entities/contacts.user.entity';
import { ProfileEntity } from './features/profiles/entities/profile.entity';
import { ProfileController } from './features/profiles/profile.controller';
import { CreateOrUpdateProfileUseCase } from './features/profiles/application/useCases/create.or.update.profile.use-case';
import { ProfileRepository } from './features/profiles/profile.repository';
import { ProfileQueryRepository } from './features/profiles/profile.query.repository';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GetProfileForCurrentUserUseCase } from './features/profiles/application/useCases/get.profile.for.current.user.use-case';
import { RefreshStrategy } from './common/strategies/refresh.strategy';
import { FollowersEntity } from './features/followers/entities/followers.entity';
import { FollowersController } from './features/followers/followers.controller';
import { CreateFollowerUseCase } from './features/followers/application/useCases/createFollower.use-case';
import { FollowerRepository } from './features/followers/follower.repository';
import { DeleteFollowerUseCase } from './features/followers/application/useCases/deleteFollower.use-case';
import { RefreshTokenDataEntity } from './features/devices/entities/refresh.token.data.entity';
import { SaveInfoAboutUserDevicesUseCase } from './features/devices/useCases/save.info.about.user.devices.use-case';
import { DevicesRepository } from './features/devices/devices.repository';
import { LogoutCurrentDeviceUseCase } from './features/devices/useCases/logout.currentDevice.use-case';
import { UpdateJwtUseCase } from './features/auth/application/useCases/update.jwt.use-case';
import { SaveAvatarUseCase } from './features/profiles/application/useCases/save.avatar.use-case';
import { FileStorageAdapterS3 } from './common/adapters/file.storage.adapter.s3';

config();

const entities = [
  UserEntity,
  ProfileEntity,
  ContactsUserEntity,
  FollowersEntity,
  RefreshTokenDataEntity,
];
const strategies = [LocalStrategy, JwtStrategy, RefreshStrategy];
const useCases = [
  CreateUserUseCase,
  CreateJwtUseCase,
  GetInformationAboutUserUseCase,
  GetAllUsersUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  CreateOrUpdateProfileUseCase,
  GetProfileForCurrentUserUseCase,
  CreateFollowerUseCase,
  DeleteFollowerUseCase,
  SaveInfoAboutUserDevicesUseCase,
  LogoutCurrentDeviceUseCase,
  UpdateJwtUseCase,
  SaveAvatarUseCase,
];
const repositories = [
  UsersRepository,
  UsersQueryRepository,
  ProfileRepository,
  ProfileQueryRepository,
  FollowerRepository,
  DevicesRepository,
];
const validators = [CheckEmailInDb, CheckUserIdInDb];

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'swagger-static'),
      serveRoot: process.env.NODE_ENV === 'development' ? '/' : '/swagger',
    }),
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
  controllers: [
    AppController,
    AuthController,
    UsersController,
    ProfileController,
    FollowersController,
  ],
  providers: [
    AppService,
    ServiceJwt,
    BcryptService,
    QueryHelper,
    FileStorageAdapterS3,
    ...strategies,
    ...useCases,
    ...repositories,
    ...validators,
  ],
})
export class AppModule {}
