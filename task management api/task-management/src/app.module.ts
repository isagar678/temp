import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from './validation';

@Module({
  imports: [UsersModule,ConfigModule.forRoot({envFilePath:`${process.cwd()}/config/src/${process.env.NODE_ENV}.env`,isGlobal:true,
    validationSchema
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
