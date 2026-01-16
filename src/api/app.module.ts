import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig, zoomConfig } from 'src/config';
import { Configmodule, MongoDbModule } from 'src/module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ZoomModule } from './zoom/zoom.module';
import { TokenModule } from './token/token.module';

@Module({
  imports: [
    Configmodule,
    MongoDbModule,
    UserModule,
    AuthModule,
    ZoomModule,
    TokenModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
