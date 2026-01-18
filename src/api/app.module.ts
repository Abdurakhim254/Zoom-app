import { Module } from '@nestjs/common';
import { Configmodule, CronModule, MongoDbModule } from 'src/module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ZoomAPiModule } from './zoomapi/zoom.api..module';
import { TokenModule } from './token/token.module';
import { ZoomModule } from './zoom/zoom.module';

@Module({
  imports: [
    Configmodule,
    CronModule,
    MongoDbModule,
    UserModule,
    AuthModule,
    ZoomAPiModule,
    TokenModule,
    ZoomModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
