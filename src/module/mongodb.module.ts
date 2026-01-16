import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppConfigOptions } from 'src/common';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const app = configService.get<AppConfigOptions>('app');

        
        if (!app?.db_url) {
          throw new Error('DB_URL is not defined');
        }

        return {
          uri: app.db_url,
        };
      },
    }),
  ],
})
export class MongoDbModule {}
