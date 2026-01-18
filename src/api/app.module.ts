import { Module } from '@nestjs/common';
import { Configmodule, CronModule, GuardModule, MongoDbModule } from 'src/module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ZoomAPiModule } from './zoomapi/zoom.api..module';
import { TokenModule } from './token/token.module';
import { ZoomModule } from './zoom/zoom.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/common';

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
    GuardModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    }
  ],
})
export class AppModule {}
