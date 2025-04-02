import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { validationSchema } from './validation';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
  
@Module({  
  imports: [ConfigModule.forRoot({
    envFilePath: `${process.cwd()}/config/src/${process.env.NODE_ENV}.env`,
    isGlobal: true,
    validationSchema,
  }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST', 'localhost'),
        port: configService.get<number>('DB_PORT', 5432),
        username: configService.get<string>('DB_USERNAME', 'postgres'),
        password: configService.get<string>('DB_PASSWORD', 'Dwarkesh@1'),
        database: 'task-management',
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
